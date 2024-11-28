import Fastify from "fastify";
import { odooRoutes } from "./routes/odoo";
import { postRoutes } from "./routes/posts";
import odooPlugin from "./plugins/odooPlugin";

const fastify = Fastify({});

const main = async () => {
  // Register plugins
  await fastify.register(odooPlugin);

  // Register routes
  await fastify.register(odooRoutes);
  await fastify.register(postRoutes);

  // Start server
  try {
    await fastify.listen({ port: 3000 });
    console.log("Server is running on http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

main();
