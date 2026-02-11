import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

// Tabela 'applications'
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  position: varchar("position", { length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).notNull().default("applied"),
  applicationDate: timestamp("application_date").notNull().defaultNow(),
  notes: text("notes"),
  companyId: integer("company_id")
    .notNull()
    .references(() => companies.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Tabela 'companies'
export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: varchar("description", { length: 1000 }),
  logoUrl: varchar("logo_url", { length: 512 }),
  website: varchar("website", { length: 255 }),
  location: varchar("location", { length: 255 }),
  industry: varchar("industry", { length: 100 }),
  companySize: varchar("company_size", { length: 50 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const companiesRelations = relations(companies, ({many}) => ({
  applications: many(applications),
}));

export const applicationsRelations = relations(applications, ({one}) => ({
  company: one(companies, {
    fields: [applications.companyId],
    references: [companies.id],
  }),
}));