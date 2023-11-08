"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SubmitTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (title === "") {
      alert("Enter a title");
      return;
    }
    if (description === "") {
      alert("Enter a description");
      return;
    }
    const response = await fetch("/api/add-todo", {
      method: "POST",
      headers: { "Content-Type": "application.json" },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    });
    if (!response.ok) {
      throw new Error(`the status code is ${response.status}`);
    }
    setTitle("");
    setDescription("");
    router.push("/todos");
    router.refresh();
  };
  return (
    <>
      <h1 className="flex justify-center font-bold">submit your todo</h1>
      <form onSubmit={(e) => handleSubmit(e)} className="flex justify-center">
        <input
          className="m-2 p-2 border-2 border-black rounded hover:bg-gray-300"
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="m-2 p-2 border-2 border-black rounded hover:bg-gray-300"
          type="text"
          value={description}
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="m-2 p-2 border-2 border-black rounded bg-gray-300 hover:bg-gray-400">
          submit
        </button>
      </form>
    </>
  );
}
