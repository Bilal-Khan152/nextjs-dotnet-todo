// Temporary demo data so the UI has something to show on first load.
// This whole file goes away when the .NET API plugs in —
// the page will fetch real todos from the backend instead.
const now = Date.now();
const day = 24 * 60 * 60 * 1000;

export const seedTodos = [
  {
    id: "seed-1",
    name: "Design the database",
    description:
      "Decide the Todo table shape: Id, Name, Description, CreatedAt. Code-first, so the C# model comes first and EF Core creates the table.",
    createdAt: now - 2 * day,
  },
  {
    id: "seed-2",
    name: "Build the .NET Web API",
    description:
      "ASP.NET Core Web API with CRUD endpoints for todos, EF Core talking to SQL Server.",
    createdAt: now - 1 * day,
  },
  {
    id: "seed-3",
    name: "Connect this frontend",
    description:
      "Replace the local state on this page with real fetch calls to the API. Same UI, real data.",
    createdAt: now,
  },
];
