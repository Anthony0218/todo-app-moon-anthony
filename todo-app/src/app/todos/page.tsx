import Link from "next/link";
import db from "../../../db/connection";
import { todoSchema } from "../../../db/schema";
import Todocard from "./components/todo-card";
import { desc } from "drizzle-orm";

export default async function todos() {
  const todos = await db
    .select()
    .from(todoSchema)
    .orderBy(desc(todoSchema.status), todoSchema.title);
  return (
    <>
      <h1 className="flex justify-center font-bold">My todos:</h1>
      <div className="flex justify-center">
        <Link href="/todos/submit-todo">
          <button className="border-2 border-black rounded m-2 p-2 bg-gray-300 hover:bg-gray-400">
            submit todo
          </button>
        </Link>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Todocard
              key={todo.id}
              id={todo.id}
              title={todo.title}
              description={todo.description}
              status={todo.status}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
