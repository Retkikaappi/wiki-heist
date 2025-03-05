import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const monstersTable = pgTable('monsters', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  link: varchar({ length: 255 }).notNull(),
  img: varchar({ length: 255 }).notNull(),

  rank: varchar({
    length: 255,
    enum: ['Bronze', 'Silver', 'Gold+'],
  }).notNull(),
  appearsOn: varchar({ length: 255 }).notNull(),
});
