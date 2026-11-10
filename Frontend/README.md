# Frontend — Next.js Todo UI

One screen, dark mode: add a todo (name + description, both required),
edit it, or delete it.

```bash
npm install
npm run dev
```

Open http://localhost:3000

Data comes from the ASP.NET Core Web API in `../Backend` — all calls live
in `lib/api.js` (default address http://localhost:5111, override with the
`NEXT_PUBLIC_API_URL` env variable). The backend must be running, and its
database created, for the list to load — see `../Backend/README.md`.
