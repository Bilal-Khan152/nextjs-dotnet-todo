"use client";

import { useEffect, useRef, useState } from "react";
import TodoForm from "@/components/TodoForm";
import TodoItem from "@/components/TodoItem";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "@/lib/api";

// Todos now come from the ASP.NET Core Web API (see lib/api.js).
// This page only manages UI state — the data itself lives in SQL Server.
export default function Home() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const formRef = useRef(null);

  // Load the list once, when the page opens.
  useEffect(() => {
    fetchTodos()
      .then(setTodos)
      .catch(() =>
        setError(
          "Can't reach the API. Is the backend running on http://localhost:5111?",
        ),
      )
      .finally(() => setIsLoading(false));
  }, []);

  async function handleCreate(values) {
    try {
      const created = await createTodo(values);
      setTodos((prev) => [created, ...prev]);
      setError(null);
    } catch {
      setError("Could not save the todo — the API did not respond.");
    }
  }

  async function handleUpdate(id, values) {
    try {
      await updateTodo(id, values);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, ...values } : todo)),
      );
      setEditingTodo(null);
      setError(null);
    } catch {
      setError("Could not update the todo — the API did not respond.");
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      if (editingTodo?.id === id) setEditingTodo(null);
      setError(null);
    } catch {
      setError("Could not delete the todo — the API did not respond.");
    }
  }

  function handleEdit(todo) {
    setEditingTodo(todo);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Soft background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-lime-400/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10rem] bottom-[-8rem] h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl"
      />

      <main className="relative mx-auto w-full max-w-2xl px-5 py-14 sm:py-20">
        {/* Header */}
        <header className="animate-rise mb-10">
          <p className="font-mono text-[11px] font-medium tracking-[0.22em] text-lime-300 uppercase">
            Next.js × .NET — Learning Project
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
            Things to <span className="text-lime-300">do.</span>
          </h1>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-zinc-400">
            A simple todo app for learning full-stack development — Next.js on
            the front, ASP.NET Core Web API at the back.
          </p>
          <p className="mt-5 font-mono text-xs text-zinc-500">
            {todos.length} {todos.length === 1 ? "todo" : "todos"} on the list
          </p>
        </header>

        {/* Create / edit form */}
        <div ref={formRef} className="scroll-mt-8">
          <TodoForm
            editingTodo={editingTodo}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onCancelEdit={() => setEditingTodo(null)}
          />
        </div>

        {/* API error banner */}
        {error && (
          <div className="animate-rise mt-6 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-5 py-3.5 text-sm text-rose-200">
            {error}
          </div>
        )}

        {/* List */}
        <section className="mt-8 space-y-3">
          {isLoading ? (
            <div className="animate-rise rounded-3xl border border-white/10 px-6 py-14 text-center">
              <p className="text-sm text-zinc-500">Loading todos…</p>
            </div>
          ) : todos.length === 0 ? (
            <div className="animate-rise rounded-3xl border border-dashed border-white/15 px-6 py-14 text-center">
              <p className="text-[15px] font-medium text-zinc-300">
                No todos yet
              </p>
              <p className="mt-1.5 text-sm text-zinc-500">
                Add your first one with the form above.
              </p>
            </div>
          ) : (
            todos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={index}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center font-mono text-[11px] tracking-wide text-zinc-600">
          Connected: this UI talks to the ASP.NET Core Web API on
          localhost:5111, data lives in SQL Server.
        </footer>
      </main>
    </div>
  );
}
