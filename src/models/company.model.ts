import { log } from "console";
import { db } from "../db";
import { companies } from "../db/schema";
import { ilike } from "drizzle-orm";

export const companyModel = {

  create: async (data: {
    name: string;
    description?: string;
    logoUrl?: string;
    website?: string;
    location?: string;
    industry?: string;
    companySize?: string;
    notes?: string;
  }) => {
    const result = await db.insert(companies).values(data).returning();
    return result[0];
  },

  getAll: async (searchQuery?: string) => {
    console.log("Search query in model:", searchQuery);
    return await db
    .select({
      id: companies.id,
      name: companies.name
    })
    .from(companies)
    .where(searchQuery ? ilike(companies.name, `%${searchQuery}%`) : undefined);
  }
};