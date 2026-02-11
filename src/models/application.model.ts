import { applications } from './../db/schema';
import { asc, eq } from "drizzle-orm";
import { db } from '../db';

export const applicationModel = {
  create: async (data: {
    position: string;
    status?: string;
    notes?: string;
    companyId: number;
  }) => {
    const result = await db.insert(applications).values(data).returning();
    return result[0];
  },

  getAll: async () => {
    return await db
      .query.applications.findMany({
        with: {
          company: {
            columns: {
              id: true,
              name: true,
            }
          }
        },
        orderBy: asc(applications.id),
      });
  },

  getById: async (id: number) => {
    const result = await db
      .select()
      .from(applications)
      .where(eq(applications.id, id));
    return result[0];
  },

  update: async (id: number, data: Partial<{
    companyId: number;
    position: string;
    status: string;
    notes: string;
  }>) => {

    console.log("Updating with data:", data);

    const result = await db
      .update(applications)
      .set(data) // Apenas os campos fornecidos em data serão atualizados
      .where(eq(applications.id, id))
      .returning();
    return result[0];
  },

  delete: async (id: number) => {
    const result = await db
      .delete(applications)
      .where(eq(applications.id, id))
      .returning();
    return result.length > 0;
  },
};