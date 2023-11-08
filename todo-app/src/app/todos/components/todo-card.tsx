"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type todocard = {
  id: number;
  title: string;
  description: string;
  status: "DONE" | "PENDING";
};

export default function Todocard({ id, title, description, status }: todocard) {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewtitle] = useState(title);
  const [newDescription, setNewdescription] = useState(description);
  const router = useRouter();
  const updateTodo = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const response = await fetch("/api/update-todo", {
      method: "POST",
      headers: { "Content-Type": "application.json" },
      body: JSON.stringify({
        id: id,
        newTitle: newTitle,
        newDescription: newDescription,
      }),
    });

    if (!response.ok) {
      throw new Error(`the status code is ${response.status}`);
    }

    router.refresh();
  };

  const deleteTodo = async () => {
    const response = await fetch("/api/delete-todo", {
      method: "DELETE",
      headers: { "Content-Type": "application.json" },
      body: JSON.stringify({
        todoId: id,
      }),
    });
    if (!response.ok) {
      throw new Error(`the status code is ${response.status}`);
    }

    router.refresh();
  };
  const finishTodo = async () => {
    const response = await fetch("/api/finish-todo", {
      method: "POST",
      headers: { "Content-Type": "application.json" },
      body: JSON.stringify({
        todoId: id,
        status: status,
      }),
    });
    if (!response.ok) {
      throw new Error(`the status code is ${response.status}`);
    }

    router.refresh();
  };
  return (
    <>
      <div className="border-2 border-black flex justify-center m-2 p-2 rounded bg-gray-300 hover:bg-gray-400 mx-20">
        {editing ? (
          <form
            onSubmit={(e) => {
              setEditing(false);
              updateTodo(e);
            }}
            className="flex justify-center"
          >
            <input
              className="m-2 p-2 border-2 border-black rounded hover:bg-gray-300"
              type="text"
              value={newTitle}
              onChange={(e) => setNewtitle(e.target.value)}
            />
            <input
              className="m-2 p-2 border-2 border-black rounded hover:bg-gray-300"
              type="text"
              value={newDescription}
              onChange={(e) => setNewdescription(e.target.value)}
            />
            <button className="m-2 p-2 border-2 border-black rounded bg-gray-300 hover:bg-gray-400">
              save
            </button>
          </form>
        ) : (
          <>
            <Link href={`/todos/${id}`}>
              <div className=" flex justify-center font-bold">{title}</div>
              <div>
                description:{description} {status === "PENDING" ? "❌" : "✅"}
              </div>
            </Link>
            <button
              onClick={() => setEditing(true)}
              className="m-2 p-2 border-2 border-black rounded bg-gray-300 hover:bg-gray-400"
            >
              edit
            </button>
            <button
              onClick={() => deleteTodo()}
              className="m-2 p-2 border-2 border-black rounded bg-gray-300 hover:bg-gray-400"
            >
              delete
            </button>
            <button
              onClick={() => finishTodo()}
              className="m-2 p-2 border-2 border-black rounded bg-gray-300 hover:bg-gray-400"
            >
              {status === "PENDING" ? "done?" : "undo"}
            </button>
          </>
        )}
      </div>
    </>
  );
}
