import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const mockKyc = sqliteTable('MockKyc', {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    address: text('address', { length: 256 }).notNull().unique(),
    name: text('name', { length: 256 }).notNull(),
    yearOfBirth: integer('yearOfBirth', { mode: 'number' }).notNull(),
    country: text('country', { length: 256 }).notNull(),
    provider_id: integer('provider_id', { mode: 'number' }).notNull(),
    submission_id: text('submission_id', { length: 256 }).notNull(),
    annual_Income: real('annual_Income').notNull(),
    monthly_Inhand_Salary: real('monthly_Inhand_Salary').notNull(),
    num_Bank_Accounts: integer('num_Bank_Accounts', { mode: 'number' }).notNull(),
    num_Credit_Cards: integer('num_Credit_Cards', { mode: 'number' }).notNull(),
    interest_Rate: integer('interest_Rate', { mode: 'number' }).notNull(),
    num_Loans: real('num_Loans').notNull(),
    delay_From_Due_Date: integer('delay_From_Due_Date', { mode: 'number' }).notNull(),
    num_Delayed_Payments: real('num_Delayed_Payments').notNull(),
    credit_Mix: integer('credit_Mix', { mode: 'number' }).notNull(),
    outstanding_Debt: real('outstanding_Debt').notNull(),
    credit_History_Year: integer('credit_History_Year', { mode: 'number' }).notNull(),
    monthly_Balance: real('monthly_Balance').notNull(),
});

export const insertMockKycSchema = createInsertSchema(mockKyc, {
    address: z.string(),
    name: z.string(),
    yearOfBirth: z.number().int().positive().min(1900),
    country: z.string().length(3),
    provider_id: z.number().int().positive(),
    submission_id: z.string(),
    annual_Income: z.number(),
    monthly_Inhand_Salary: z.number(),
    num_Bank_Accounts: z.number().int().positive(),
    num_Credit_Cards: z.number().int().positive(),
    interest_Rate: z.number().int().positive(),
    num_Loans: z.number(),
    delay_From_Due_Date: z.number().int().positive(),
    num_Delayed_Payments: z.number(),
    credit_Mix: z.number().int().positive(),
    outstanding_Debt: z.number(),
    credit_History_Year: z.number().int().positive(),
    monthly_Balance: z.number(),
});
export const selectMockKycSchema = createSelectSchema(mockKyc);
