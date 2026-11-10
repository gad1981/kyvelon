# Kyvelon

Full-screen **κύβος** cube website for Kyvelon — software, websites, automation, and digital services from Athens. Founded by [George Gad](https://georgegad.com).

## Experience

1. **Home** (`/[locale]`) — cube stage + story + **site footer**
2. **Face apps** (`/[locale]/faces/[face]`) — full-screen apps, **no footer**
3. **Site pages** (with footer) — `/contact`, `/terms`, `/people`
4. **Story** on home — origin, connections, method (founder lives on People)

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
