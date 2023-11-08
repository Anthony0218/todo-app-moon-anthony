DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('DONE', 'PENDING');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text NOT NULL,
	"date" timestamp DEFAULT now(),
	"status" "status" DEFAULT 'PENDING' NOT NULL
);
