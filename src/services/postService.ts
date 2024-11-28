import { db } from '../config/database';
import { posts } from '../models/posts';
import { eq } from 'drizzle-orm';
import type { Post } from '../types/post';

export class PostService {
  static async getAllPosts() {
    try{
      return await db.select().from(posts).execute();
    }
    catch(err){
      console.log(err);
    }
  }

  static async createPost(title: string, content: string) {
    return await db.insert(posts).values({ title, content }).returning();
  }

  static async getPostById(id: number) {
    return await db.select().from(posts).where(eq(posts.id, id)).execute();
  }

  static async updatePost(id: number, data: Partial<Post>) {
    const updatedData = { ...data, timestamp: data.timestamp ? new Date(data.timestamp) : undefined };
    return await db.update(posts).set(updatedData).where(eq(posts.id, id)).returning();
  }

  static async deletePost(id: number) {
    return await db.delete(posts).where(eq(posts.id, id)).returning();
  }
}
