import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, 'dist');
const PORT = parseInt(process.env.PORT || '8080', 10);
const API_TARGET = process.env.API_TARGET || 'http://localhost:3000';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
};

const CACHE_IMMUTABLE = new Set(['.js', '.css', '.woff2', '.woff', '.ttf']);

function serveStatic(req, res) {
  let filePath = path.join(DIST, req.pathname === '/' ? 'index.html' : req.pathname);
  const ext = path.extname(filePath);
  const mime = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(DIST, 'index.html'), (err2, data2) => {
        if (err2) {
          res.writeHead(500);
          res.end('Internal Server Error');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data2);
      });
      return;
    }
    const headers = { 'Content-Type': mime };
    if (CACHE_IMMUTABLE.has(ext)) {
      headers['Cache-Control'] = 'public, max-age=31536000, immutable';
    }
    res.writeHead(200, headers);
    res.end(data);
  });
}

function proxyApi(req, res) {
  const targetUrl = new URL(req.url, API_TARGET);
  const options = {
    hostname: targetUrl.hostname,
    port: targetUrl.port,
    path: targetUrl.pathname + targetUrl.search,
    method: req.method,
    headers: { ...req.headers },
  };
  delete options.headers['host'];

  const proxyReq = http.request(options, (proxyRes) => {
    const body = [];
    proxyRes.on('data', (chunk) => body.push(chunk));
    proxyRes.on('end', () => {
      const data = Buffer.concat(body);
      const headers = { ...proxyRes.headers };
      delete headers['content-encoding'];
      res.writeHead(proxyRes.statusCode, headers);
      res.end(data);
    });
  });

  proxyReq.on('error', () => {
    res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Backend unavailable' }));
  });

  if (req.bodyBuffer) {
    proxyReq.write(req.bodyBuffer);
  }
  req.on('data', (chunk) => proxyReq.write(chunk));
  req.on('end', () => proxyReq.end());
}

const server = http.createServer((req, res) => {
  req.pathname = new URL(req.url, `http://${req.headers.host}`).pathname;

  if (req.pathname.startsWith('/api/')) {
    proxyApi(req, res);
  } else {
    serveStatic(req, res);
  }
});

server.listen(PORT, () => {
  console.log(`[server] Frontend serving on http://localhost:${PORT}`);
  console.log(`[server] API proxied to ${API_TARGET}`);
});
