import { sql } from 'drizzle-orm';
import { pgTable,  integer, timestamp, varchar } from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 256 }).notNull(),
  content: varchar({ length: 256 }).notNull(),
  timestamp: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
