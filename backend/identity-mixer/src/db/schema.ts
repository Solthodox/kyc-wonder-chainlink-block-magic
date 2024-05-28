import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const clients = sqliteTable('clients', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    creator: text('creator', { length: 256 }).notNull(),
});

export const insertClientsSchema = createInsertSchema(clients);
export const selectClientsSchema = createSelectSchema(clients)

export const providers = sqliteTable('providers', { 
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name', { length: 256 }).unique().notNull(),
});

export const insertProvidersSchema = createInsertSchema(providers, {
    
});
export const selectProvidersSchema = createSelectSchema(providers);

export const relations = sqliteTable('relations', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    address: text('address', { length: 256 }).notNull(),
    provider_id: integer('provider_id', { mode: 'number' }).notNull(),
    client_id: integer('client_id', { mode: 'number' }).notNull(),
    submission_id: text('submission_id', { length: 256 }).notNull(),
});

export const insertRelationsSchema = createInsertSchema(relations);
export const selectRelationsSchema = createSelectSchema(relations);

export const mockKyc = sqliteTable('mockKyc', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    name: text('name', { length: 256 }).notNull(),
    yearOfBirth: integer('yearOfBirth', { mode: 'number' }).notNull(),
    country: text('country', { length: 256 }).notNull(),
    provider_id: integer('provider_id', { mode: 'number' }).notNull(),
    submission_id: text('submission_id', { length: 256 }).notNull(),
    creditScore: integer('creditScore', { mode: 'number' }).notNull(),
});

export const insertMockKycSchema = createInsertSchema(mockKyc, {
    name: z.string(),
    yearOfBirth: z.number().int().positive().min(1900),
    country: z.string().length(3),
    provider_id: z.number().int().positive(),
    submission_id: z.string(),
    creditScore: z.number().int().positive().min(0).max(2)
});
export const selectMockKycSchema = createSelectSchema(mockKyc);
