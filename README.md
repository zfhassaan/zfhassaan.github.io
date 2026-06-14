# Hassaan Ali — Senior Full Stack Engineer

> Personal portfolio of **Hassaan Ali (`zfhassaan`)** — a Senior Full Stack / Backend Engineer specializing in **Laravel, Node.js, Vue.js, React, distributed systems, RabbitMQ, and payment‑gateway integrations for the Pakistan fintech ecosystem**.

🔗 **Live site:** [zfhassaan.github.io](https://zfhassaan.github.io)
📍 Lahore, Pakistan · Remote‑friendly · Open to roles, contracts & consulting

[![Deploy to GitHub Pages](https://github.com/zfhassaan/zfhassaan.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/zfhassaan/zfhassaan.github.io/actions/workflows/deploy.yml)
![Vue](https://img.shields.io/badge/Vue-3-42b883?logo=vuedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

---

## About

I'm **Hassaan Ali**, a Senior Software Engineer with **9+ years** building scalable web applications, APIs, and microservices. I focus on **Laravel** and **NestJS** on the backend, **Vue.js** and **React** on the frontend, and **event‑driven architecture** with **RabbitMQ** and **Redis** for high‑throughput systems.

I'm also an active **open‑source contributor** — I publish and maintain Laravel packages for **Pakistan's major payment gateways** (JazzCash, PayFast, EasyPaisa, Bank Alfalah) on Packagist, and I contribute to the widely‑used `bschmitt/laravel-amqp` RabbitMQ package.

---

## Tech Stack Used

| Layer | Technologies |
|-------|--------------|
| **Framework** | Vue 3 (Composition API) |
| **Build tool** | Vite |
| **Styling** | Tailwind CSS, shadcn‑vue, CSS custom properties |
| **Animation** | GSAP + ScrollTrigger |
| **Deployment** | GitHub Pages via GitHub Actions |
| **Language** | JavaScript (ESM) |

---

## Getting Started

### Prerequisites
- **Node.js 20+** and **npm**

### Installation

```bash
# Clone the repository
git clone https://github.com/zfhassaan/zfhassaan.github.io.git
cd zfhassaan.github.io

# Install dependencies
npm install
```

### Development

```bash
# Start the dev server with hot module replacement
npm run dev
```

### Production build

```bash
# Build the optimized site into ./docs
npm run build

# Preview the production build locally
npm run preview
```

---

## Deployment

The site is deployed automatically to **GitHub Pages** using GitHub Actions. Every push to the `master` branch triggers a build (`npm run build` → `./docs`) and deploys it.

To enable it on a fork:
1. Go to **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
2. Push to `master` — the workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) handles the rest.

---

## Project Structure

```
zfhassaan.github.io/
├── .github/workflows/   # CI/CD — GitHub Pages auto-deploy
├── docs/                # Production build output (served by GitHub Pages)
├── public/              # Static assets (avatar, etc.)
├── src/
│   ├── components/      # Vue section components (Hero, Projects, Timeline…)
│   ├── composables/     # GSAP animation engine & interactions
│   ├── assets/styles/   # Design tokens, light/dark theme, global CSS
│   └── main.js          # App entry point
├── index.html           # SEO meta tags + theme bootstrap
└── vite.config.js       # Build config (outputs to ./docs)
```

---

## Featured Work

A few of the open‑source projects showcased in this portfolio:

- **[JazzCash Laravel SDK](https://github.com/zfhassaan/jazzcash)** — Payment gateway package for Laravel (Pakistan)
- **[PayFast Laravel SDK](https://github.com/zfhassaan/payfast)** — PayFast integration with IPNs & idempotent checks
- **[Laravel Wallet](https://github.com/zfhassaan/laravel-wallet)** — Ledger‑based e‑wallet with atomic transfers & tamper detection
- **[DBX](https://github.com/zfhassaan/dbx)** — Cross‑platform Go CLI for database backup & restore
- **[laravel-amqp](https://github.com/bschmitt/laravel-amqp)** — RabbitMQ for Laravel (contributor)

---

## 📫 Contact

-  **Portfolio:** [zfhassaan.github.io](https://zfhassaan.github.io)
-  **LinkedIn:** [linkedin.com/in/zfhassaan](https://linkedin.com/in/zfhassaan)
-  **GitHub:** [github.com/zfhassaan](https://github.com/zfhassaan)
-  **Email:** [zfhassaan@gmail.com](mailto:zfhassaan@gmail.com)
-  **Packagist:** [packagist.org/users/zfhassaan](https://packagist.org/users/zfhassaan)

---

## 📄 License

This project is open‑sourced under the [MIT License](LICENSE). Feel free to use the structure as inspiration for your own portfolio — a star ⭐ is always appreciated.

---

<sub>**Keywords:** Hassaan Ali · zfhassaan · Senior Full Stack Engineer · Laravel Developer · Node.js · Vue.js · React · NestJS · RabbitMQ · Microservices · Payment Gateway Integration · JazzCash · PayFast · EasyPaisa · SaaS · ERP · Pakistan Software Engineer · Portfolio</sub>
