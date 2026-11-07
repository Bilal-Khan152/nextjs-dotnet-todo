"use client";

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TodoItem({ todo, index, onEdit, onDelete }) {
  return (
    <article
      className="animate-rise group rounded-3xl border border-white/10 bg-zinc-900/50 p-5 backdrop-blur transition hover:border-white/20 sm:p-6"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-semibold tracking-tight text-zinc-50">
            {todo.name}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
            {todo.description}
          </p>
          <p className="mt-3 font-mono text-[11px] tracking-wide text-zinc-500">
            {formatDate(todo.createdAt)}
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => onEdit(todo)}
            aria-label={`Edit ${todo.name}`}
            className="cursor-pointer rounded-lg border border-white/10 p-2 text-zinc-400 transition hover:border-lime-300/40 hover:bg-lime-400/10 hover:text-lime-300 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onDelete(todo.id)}
            aria-label={`Delete ${todo.name}`}
            className="cursor-pointer rounded-lg border border-white/10 p-2 text-zinc-400 transition hover:border-rose-400/40 hover:bg-rose-500/10 hover:text-rose-300 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <path d="M10 11v6M14 11v6" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
