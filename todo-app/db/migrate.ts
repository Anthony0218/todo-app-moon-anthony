import { migrate } from "drizzle-orm/postgres-js/migrator";
import db from "./connection";

const migrateDB = async () => {
  console.log("migration started...");
  await migrate(db, { migrationsFolder: "migrations" });
  console.log("migration ended...");
};

migrateDB()
  .then((data) => console.log(data))
  .catch((error) => {
    throw new Error(error);
  });
