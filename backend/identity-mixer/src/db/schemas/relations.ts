import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const relations = sqliteTable(
    'Relations', 
    {
        id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
        address: text('address', { length: 256 }).notNull().unique(),
        provider_id: integer('provider_id', { mode: 'number' }).notNull(),
        client_id: integer('client_id', { mode: 'number' }).notNull(),
        submission_id: text('submission_id', { length: 256 }).notNull(),
        yearOfBirth: integer('yearOfBirth', { mode: 'number' }).notNull(),
        countryCode: integer('countryCode', { mode: 'number' }).notNull(),
        isAdult: integer('isAdult', { mode: 'number' }).notNull(),
        creditScore: integer('creditScore', { mode: 'number' }).notNull(),
    },
    (relations) => {
        return {
            clientIdIndex: index('name_idx').on(relations.client_id),
        }
    }
);

export const insertRelationsSchema = createInsertSchema(relations, {
    address: z.string(),
    provider_id: z.number().int().positive(),
    client_id: z.number().int().positive(),
    submission_id: z.string(),
    yearOfBirth: z.number().int().positive().min(1900),
    countryCode: z.number().int().positive(),
    isAdult: z.number().int().positive().min(0).max(1),
    creditScore: z.number().int().positive(),
});
export const selectRelationsSchema = createSelectSchema(relations);
