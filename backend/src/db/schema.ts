import { relations } from 'drizzle-orm';
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

export const monsterDetailsTable = pgTable('monsterDetails', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  boardImage: varchar({ length: 255 }).notNull(),
});

export const monsterDetailRelations = relations(
  monsterDetailsTable,
  ({ many }) => ({
    monsterSkills: many(monsterSkills),
    monsterItems: many(monsterItems),
  })
);

export const monsterSkills = pgTable('monsterSkills', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  monsterId: integer()
    .notNull()
    .references(() => monsterDetailsTable.id),
  sprite: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  effects: varchar({ length: 255 }).notNull(),
  startingTier: varchar({ length: 255 }).notNull(),
  types: varchar({ length: 255 }).notNull(),
});

export const monsterSkillRelations = relations(monsterSkills, ({ one }) => ({
  monster: one(monsterDetailsTable, {
    fields: [monsterSkills.monsterId],
    references: [monsterDetailsTable.id],
  }),
}));

export const monsterItems = pgTable('monsterItems', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  monsterId: integer()
    .notNull()
    .references(() => monsterDetailsTable.id),
  sprite: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  effects: varchar({ length: 255 }).notNull(),
  cooldown: varchar({ length: 255 }).notNull(),
  ammo: varchar({ length: 255 }).notNull(),
  types: varchar({ length: 255 }).notNull(),
  size: varchar({ length: 255 }).notNull(),
});

export const monsterItemRelations = relations(monsterItems, ({ one }) => ({
  monster: one(monsterDetailsTable, {
    fields: [monsterItems.monsterId],
    references: [monsterDetailsTable.id],
  }),
}));
