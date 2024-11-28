import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/models/posts.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  // dbCredentials: {
  //   host: process.env.DB_HOST!,
  //   port: Number(process.env.DB_PORT!),
  //   user: process.env.DB_USER!,
  //   password: process.env.DB_PASSWORD!,
  //   database: process.env.DB_NAME!,
  //   ssl: true,
  // },
  // verbose: true,
  // strict: true,
});
