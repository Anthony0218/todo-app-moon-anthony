import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { connectionString } from "./const";

if (connectionString === undefined) {
  throw new Error("unknown connectionstring");
}
const client = postgres(connectionString);
const db = drizzle(client);

export default db;
