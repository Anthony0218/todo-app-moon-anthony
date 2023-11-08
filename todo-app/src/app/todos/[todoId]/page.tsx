import { eq } from "drizzle-orm";
import db from "../../../../db/connection";
import { todoSchema } from "../../../../db/schema";
import { redirect } from "next/navigation";
import Todocard from "@/app/todos/components/todo-card";

type Context = {
  params: {
    todoId: string;
  };
};

export default async function todo({ params: { todoId } }: Context) {
  const Todos = await db.select().from(todoSchema);
  const rightTodo = Todos.find((todo) => todo.id === Number(todoId));
  if (rightTodo === undefined) {
    redirect("../");
  }
  return (
    <>
      <Todocard
        key={rightTodo.id}
        id={rightTodo.id}
        title={rightTodo.title}
        description={rightTodo.description}
        status={rightTodo.status}
      />
    </>
  );
}
