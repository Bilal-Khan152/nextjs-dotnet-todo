# nextjs-dotnet-todo

A simple **Todo CRUD app** built for learning full-stack development:

- **Frontend** — Next.js + Tailwind CSS
- **Backend** — ASP.NET Core Web API + EF Core (code-first) + SQL Server

The two are connected: the frontend calls the API at http://localhost:5111
(CORS is enabled for http://localhost:3000). See `Backend/README.md` for
how to run the API and create the database.

## Structure

```
Frontend/   Next.js app — one screen: add, edit, delete todos
Backend/    ASP.NET Core Web API — to be built
```

## Run the frontend

```bash
cd Frontend
npm install
npm run dev
```

Then open http://localhost:3000

Right now todos live in local browser state. When the backend is ready, the
frontend will call the API instead — same UI, real data.
