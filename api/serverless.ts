"use strict";
import * as dotenv from "dotenv";
dotenv.config();
import Fastify from "fastify";
import { postRoutes } from "../src/routes/posts";
import { odooRoutes } from "../src/routes/odoo";
import odooPlugin from "../src/plugins/odooPlugin";
const app = Fastify({
  logger: true,
});

const startServer = async () => {
  await app.register(odooPlugin);
  await app.register(odooRoutes);
  await app.register(postRoutes);
  try {
    await app.listen({ port: 3000 });
    console.log("Server is running on http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

startServer();

export default async (req: any, res: any) => {
    await app.ready();
    app.server.emit('request', req, res);
}