import fp from 'fastify-plugin';
import { connectOdoo } from '../config/odoo';

export default fp(async (fastify) => {
  fastify.addHook('onRequest', async (request) => {
    if (request.url.startsWith('/odoo/')) {
      await connectOdoo();
    }
  });
});