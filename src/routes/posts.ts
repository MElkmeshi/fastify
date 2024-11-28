import { FastifyInstance } from 'fastify';
import { PostService } from '../services/postService';
import { z } from 'zod';

const postSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export async function postRoutes(fastify: FastifyInstance) {
  fastify.get('/posts', async () => {
    return await PostService.getAllPosts();
  });

  fastify.post('/posts', async (request, reply) => {
    const validation = postSchema.safeParse(request.body);
    
    if (!validation.success) {
      return reply.code(400).send(validation.error);
    }

    const { title, content } = validation.data;
    const post = await PostService.createPost(title, content);
    return reply.code(201).send(post);
  });

  fastify.get('/posts/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const post = await PostService.getPostById(parseInt(id));
    
    if (!post) {
      return reply.code(404).send('Post not found');
    }
    
    return post;
  });

  fastify.put('/posts/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const validation = postSchema.partial().safeParse(request.body);
    
    if (!validation.success) {
      return reply.code(400).send(validation.error);
    }

    const post = await PostService.updatePost(parseInt(id), validation.data);
    
    if (!post) {
      return reply.code(404).send('Post not found');
    }
    
    return post;
  });

  fastify.delete('/posts/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const post = await PostService.deletePost(parseInt(id));
    
    if (!post) {
      return reply.code(404).send('Post not found');
    }
    
    return reply.code(204).send();
  });
}
