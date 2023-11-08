import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="flex justify-center">Welcome to my app</h1>
      <Link href="./todos">
        <p className="flex justify-center">
          <button className="border-2 border-black rounded m-2 p-2 bg-gray-300 hover:bg-gray-400">
            My todo-app
          </button>
        </p>
      </Link>
    </>
  );
}
