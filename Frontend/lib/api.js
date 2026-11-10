// Every call to the .NET backend lives in this one file.
// If the backend address ever changes, this is the only place to touch.
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5111";

// The API sends dates as text ("2026-11-10T..."). The UI wants a
// timestamp number, so convert once, here at the border.
function toUiTodo(apiTodo) {
  return {
    id: apiTodo.id,
    name: apiTodo.name,
    description: apiTodo.description,
    createdAt: Date.parse(apiTodo.createdAt),
  };
}

export async function fetchTodos() {
  const res = await fetch(`${API_BASE}/api/todos`);
  if (!res.ok) throw new Error("Could not load todos from the API.");
  const data = await res.json();
  return data.map(toUiTodo);
}

export async function createTodo({ name, description }) {
  const res = await fetch(`${API_BASE}/api/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description }),
  });
  if (!res.ok) throw new Error("Could not create the todo.");
  return toUiTodo(await res.json());
}

export async function updateTodo(id, { name, description }) {
  const res = await fetch(`${API_BASE}/api/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description }),
  });
  if (!res.ok) throw new Error("Could not update the todo.");
}

export async function deleteTodo(id) {
  const res = await fetch(`${API_BASE}/api/todos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Could not delete the todo.");
}
