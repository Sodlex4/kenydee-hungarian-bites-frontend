# Kenydee Hungarian Bites Frontend

**URL**: https://hungarianbites.co.ke
**Status**: Frontend-only (no backend/database yet)

A single-page e-commerce site for **Kenydee Hungarian Bites** — a Kenyan food business selling authentic Hungarian Hot Dog Rolls. Customers browse, add to cart, and check out via WhatsApp. An admin dashboard provides mock analytics for revenue, orders, customers, and product management.

---

## Features

### Customer-Facing
- **Product ordering** — 3 package tiers (5, 10, 20 pieces) with per-piece pricing
- **Shopping cart** — slide-in drawer with quantity controls, line subtotals, localStorage persistence
- **WhatsApp checkout** — auto-generates pre-filled order message to `+254759233065`
- **Quick-order button** — bypass cart and message directly via WhatsApp
- **Responsive design** — mobile-first, dark theme with pink/purple/indigo palette
- **GSAP loading screen** — animated intro with skip button
- **Legal pages** — Terms, Privacy, About

### Admin Dashboard
- **Overview** — KPI cards (revenue, orders, customers, products) + weekly revenue chart (Recharts AreaChart)
- **Customers** — data table with mock customer records
- **Orders** — order tracking table with status badges
- **Products** — product listing table
- **Notifications** — notification management
- **Settings** — theme toggle (persisted), profile dropdown with logout
- **6 sub-routes**: `/admin`, `/admin/customers`, `/admin/orders`, `/admin/products`, `/admin/notifications`, `/admin/settings`

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 |
| UI Components | shadcn/ui (Radix UI primitives) |
| Routing | React Router DOM 6 |
| State | React Context (cart) |
| Animations | GSAP 3 |
| Charts | Recharts 2 |
| Notifications | Sonner |
| Icons | Lucide React |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Install & Run
```sh
git clone https://github.com/Sodlex4/kenydee-hungarian-bites-frontend.git
cd kenydee-hungarian-bites-frontend
npm install
npm run dev
```

The dev server starts at `http://localhost:8080`.

### Build for Production
```sh
npm run build
npm run preview
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
VITE_WHATSAPP_NUMBER=254759233065
VITE_CONTACT_EMAIL=orders@hungarianbites.co.ke
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_SITE_URL=https://hungarianbites.co.ke
```

| Variable | Description |
|---|---|
| `VITE_WHATSAPP_NUMBER` | WhatsApp number for checkout (international format, no `+` or spaces) |
| `VITE_CONTACT_EMAIL` | Contact email shown in footer/legal pages |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics measurement ID (leave empty to disable) |
| `VITE_SITE_URL` | Canonical site URL for OpenGraph/meta tags |

> **Note:** Currently these values are hardcoded in the source. The migration to `import.meta.env` is on the roadmap.

---

## Project Structure

```
src/
├── components/
│   ├── ui/              # 40+ shadcn/ui primitives (button, card, table, dialog, etc.)
│   ├── admin/           # Admin dashboard layout, sidebar, topbar, charts, data tables
│   ├── Cart.tsx         # Slide-in cart drawer with WhatsApp checkout
│   ├── Header.tsx       # Fixed nav with cart badge + mobile menu
│   ├── Footer.tsx       # Contact info, social links, business hours
│   ├── HeroSection.tsx  # Landing hero with GSAP animations
│   ├── AboutSection.tsx # Business story
│   ├── FeaturesSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── OrderSection.tsx # Product packages + Add to Cart / WhatsApp buttons
│   └── LoadingScreen.tsx
├── context/
│   └── CartContext.tsx  # Cart state, localStorage persistence, body scroll lock
├── pages/
│   ├── admin/           # 6 admin route pages
│   ├── legal/           # Terms, Privacy, About
│   ├── Index.tsx        # Main landing (assembles all public sections)
│   └── NotFound.tsx     # Themed 404 page
├── hooks/               # use-mobile, use-toast
├── lib/                 # Utility functions (cn helper)
├── types/               # Global type declarations (gtag, vite-env)
├── App.tsx              # Route definitions
├── index.css            # CSS variables, theme, animations
└── main.tsx             # Entry point
```

---

## Deployment

### Vercel
```sh
vercel --prod
```

SPA routing is handled by `vercel.json` which rewrites all paths to `index.html`.

### Custom Domain
Configure via **Project > Settings > Domains** on Vercel, or see the [Vercel docs](https://vercel.com/docs/custom-domains).

---

## Known Limitations

- **No backend** — all admin data is mock/localStorage. No database, no API.
- **No authentication** — `/admin/*` routes are publicly accessible.
- **Hardcoded config** — WhatsApp number, emails, and URLs are inline in source (not using `import.meta.env`).
- **No tests** — zero test coverage.
- **No CI/CD** — no pre-commit hooks, no GitHub Actions.

---

## Roadmap

- [ ] Backend integration (Node.js/Express or serverless functions)
- [ ] Database (PostgreSQL/Supabase) for orders, customers, products
- [ ] Admin authentication (login page, route guards)
- [ ] M-Pesa / Stripe payment integration
- [ ] Migrate hardcoded config to environment variables
- [ ] Add tests (Vitest + React Testing Library)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Error boundaries and loading states for data fetching
- [ ] SEO improvements (sitemap, robots.txt, structured data)

---

Made by [Sodlex](https://github.com/Sodlex4) for **Kenydee Hungarian Bites**
