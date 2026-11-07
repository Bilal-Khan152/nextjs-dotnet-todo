# Frontend — Next.js Todo UI

One screen, dark mode: add a todo (name + description, both required),
edit it, or delete it.

```bash
npm install
npm run dev
```

Open http://localhost:3000

Data is local state for now (`app/page.js`). When the ASP.NET Core Web API
in `../Backend` is ready, the handlers here become `fetch()` calls to it.
