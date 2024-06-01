import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const clients = sqliteTable('clients', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    creator: text('creator', { length: 256 }).notNull(),
});

export const insertClientsSchema = createInsertSchema(clients, {
    creator: z.string(),
});
export const selectClientsSchema = createSelectSchema(clients)
