import { pgTable, integer, varchar } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const monsters = pgTable("monsters", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "monsters_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 255 }).notNull(),
	link: varchar({ length: 255 }).notNull(),
	img: varchar({ length: 255 }).notNull(),
	rank: varchar({ length: 255 }).notNull(),
	appearsOn: varchar({ length: 255 }).notNull(),
});
