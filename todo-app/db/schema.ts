import {
  pgTable,
  serial,
  varchar,
  text,
  time,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
export const status = pgEnum("status", ["DONE", "PENDING"]);

export const todoSchema = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description").notNull(),
  time: timestamp("date").defaultNow().notNull(),
  status: status("status").notNull().default("PENDING"),
});
