# Kyvelon

Full-screen **κύβος** cube website for Kyvelon — software, websites, automation, and digital services from Athens. Founded by [George Gad](https://georgegad.com).

## Experience

1. **Cube stage** — drag to rotate, enter any of six faces
2. **Story depth** — origin, connections between faces, founder, method, close CTA
3. **Footer** — classic site footer with contact and language switcher

## Languages (i18n)

| Code | Language | Direction |
| ---- | -------- | --------- |
| `en` | English  | LTR       |
| `el` | Ελληνικά | LTR       |
| `ar` | العربية  | RTL       |

Routes: `/en`, `/el`, `/ar` (root `/` redirects from `Accept-Language`).

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Custom dictionaries under `src/i18n/`

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:4317](http://localhost:4317).
