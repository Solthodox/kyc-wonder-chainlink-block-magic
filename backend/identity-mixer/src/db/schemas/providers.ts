import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const providers = sqliteTable('providers', { 
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name', { length: 256 }).unique().notNull(),
});

export const insertProvidersSchema = createInsertSchema(providers, {
   name: z.string(), 
});
export const selectProvidersSchema = createSelectSchema(providers);
