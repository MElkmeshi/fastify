import { FastifyInstance } from 'fastify';
import { OdooService } from '../services/odooService';

export async function odooRoutes(fastify: FastifyInstance) {
  fastify.get('/odoo/products', async (request, reply) => {
    const [products, error] = await OdooService.getProducts();

    if (error) {
      return reply.code(422).send(error.message);
    }

    if (products.length === 0) {
      return reply.code(404).send('not found');
    }

    return products;
  });

  fastify.get('/odoo/contacts', async (request, reply) => {
    const [contacts, error] = await OdooService.getContacts();

    if (error) {
      return reply.code(422).send(error.message);
    }

    if (contacts.length === 0) {
      return reply.code(404).send('not found');
    }

    return contacts;
  });

  fastify.get('/odoo/contacts/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    
    const [contacts, error] = await OdooService.getContactById(parseInt(id));

    if (error) {
      return reply.code(422).send(error.message);
    }

    if (contacts.length === 0) {
      return reply.code(404).send('not found');
    }

    const [contact] = contacts;
    return contact;
  });
}
