# Backend — ASP.NET Core Web API

Clean-architecture layout inside one project (`CRUD/`):

```
CRUD/
  Controllers/     API layer — HTTP endpoints (TodosController)
  Application/     Request shapes the frontend is allowed to send
  Domain/          TodoItem — the data container class (one object = one row)
  Infrastructure/  AppDbContext — the bridge to SQL Server
```

## Run it (local)

1. Make sure your local SQL Server engine is running (it is, as a service).
2. First time only — create the database tables from the code (code-first):
   open the solution in Visual Studio, then in **Package Manager Console**:

   ```
   Add-Migration InitialCreate
   Update-Database
   ```

   This creates a database named **TodoDb** (see the connection string in
   `CRUD/appsettings.json`) with a `Todos` table.
3. Run the API on the http profile so the frontend can call it:

   ```
   cd CRUD
   dotnet run --launch-profile http
   ```

   API is then at http://localhost:5111 — test it with `CRUD/CRUD.http`.

## Endpoints

| Method | URL             | What it does          |
| ------ | --------------- | --------------------- |
| GET    | /api/todos      | List all, newest first |
| POST   | /api/todos      | Create one            |
| PUT    | /api/todos/{id} | Update name + description |
| DELETE | /api/todos/{id} | Delete one            |
