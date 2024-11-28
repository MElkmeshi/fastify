CREATE TABLE IF NOT EXISTS "posts" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"content" varchar(256) NOT NULL,
	"timestamp" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
