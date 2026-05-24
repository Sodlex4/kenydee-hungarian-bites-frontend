module.exports = {
  apps: [
    {
      name: 'backend',
      script: '/home/sodlex/dev/web/kenydee-hungarian-bites-api/dist/index.js',
      cwd: '/home/sodlex/dev/web/kenydee-hungarian-bites-api',
      env: { NODE_ENV: 'production' },
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: '/home/sodlex/logs/api-error.log',
      out_file: '/home/sodlex/logs/api-out.log',
      max_restarts: 10,
      restart_delay: 3000,
    },
    {
      name: 'frontend',
      script: '/home/sodlex/dev/web/kenydee-hungarian-bites-frontend/server.mjs',
      cwd: '/home/sodlex/dev/web/kenydee-hungarian-bites-frontend',
      env: { PORT: '8080', API_TARGET: 'http://localhost:3000' },
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: '/home/sodlex/logs/web-error.log',
      out_file: '/home/sodlex/logs/web-out.log',
      max_restarts: 10,
      restart_delay: 3000,
    },
  ],
};
