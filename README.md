# nextjs-dotnet-todo

A simple **Todo CRUD app** built for learning full-stack development:

- **Frontend** — Next.js + Tailwind CSS (this is done, UI only for now)
- **Backend** — ASP.NET Core Web API + EF Core (code-first) + SQL Server (coming next)

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
