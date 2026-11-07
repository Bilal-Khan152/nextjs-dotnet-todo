"use client";

import { useEffect, useRef, useState } from "react";

export default function TodoForm({ editingTodo, onCreate, onUpdate, onCancelEdit }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);

  const isEditing = Boolean(editingTodo);

  // When an edit starts, load that todo into the form and focus the name field.
  useEffect(() => {
    if (editingTodo) {
      setName(editingTodo.name);
      setDescription(editingTodo.description);
      setErrors({});
      nameRef.current?.focus();
    }
  }, [editingTodo]);

  function validate(values) {
    const next = {};
    if (!values.name.trim()) next.name = "Name is required.";
    if (!values.description.trim()) next.description = "Description is required.";
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const values = { name, description };
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (isEditing) {
      onUpdate(editingTodo.id, {
        name: name.trim(),
        description: description.trim(),
      });
    } else {
      onCreate({ name: name.trim(), description: description.trim() });
    }
    setName("");
    setDescription("");
    setErrors({});
  }

  function handleCancel() {
    setName("");
    setDescription("");
    setErrors({});
    onCancelEdit();
  }

  const inputClasses = (hasError) =>
    `w-full rounded-xl border bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 transition outline-none focus:ring-2 ${
      hasError
        ? "border-rose-500/60 focus:border-rose-400 focus:ring-rose-500/20"
        : "border-white/10 focus:border-lime-300/60 focus:ring-lime-400/20"
    }`;

  return (
    <section className="animate-rise rounded-3xl border border-white/10 bg-zinc-900/50 p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur sm:p-7">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-semibold tracking-tight text-zinc-50">
          {isEditing ? "Edit todo" : "Add a todo"}
        </h2>
        {isEditing && (
          <span className="rounded-full border border-lime-300/30 bg-lime-400/10 px-2.5 py-1 text-[11px] font-medium tracking-wide text-lime-300">
            EDITING
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label
            htmlFor="todo-name"
            className="mb-1.5 block text-[11px] font-semibold tracking-[0.14em] text-zinc-400 uppercase"
          >
            Name <span className="text-lime-300">*</span>
          </label>
          <input
            id="todo-name"
            ref={nameRef}
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            placeholder="e.g. Finish the API endpoints"
            className={inputClasses(errors.name)}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-rose-400">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="todo-description"
            className="mb-1.5 block text-[11px] font-semibold tracking-[0.14em] text-zinc-400 uppercase"
          >
            Description <span className="text-lime-300">*</span>
          </label>
          <textarea
            id="todo-description"
            rows={3}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description)
                setErrors((prev) => ({ ...prev, description: undefined }));
            }}
            placeholder="What needs to be done, in a line or two…"
            className={`${inputClasses(errors.description)} resize-none`}
          />
          {errors.description && (
            <p className="mt-1.5 text-xs text-rose-400">{errors.description}</p>
          )}
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-lime-400 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-lime-300 active:scale-[0.98]"
          >
            {isEditing ? (
              "Save changes"
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="h-4 w-4"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add todo
              </>
            )}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              className="cursor-pointer rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/5 active:scale-[0.98]"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
