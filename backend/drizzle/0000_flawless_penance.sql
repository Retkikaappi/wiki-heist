CREATE TABLE "monsterDetails" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "monsterDetails_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"boardImage" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "monsterItems" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "monsterItems_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"monsterId" integer NOT NULL,
	"sprite" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"effects" varchar(255) NOT NULL,
	"cooldown" varchar(255) NOT NULL,
	"ammo" varchar(255) NOT NULL,
	"startingTier" varchar(255) NOT NULL,
	"types" varchar(255) NOT NULL,
	"size" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "monsterSkills" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "monsterSkills_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"monsterId" integer NOT NULL,
	"sprite" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"effects" varchar(255) NOT NULL,
	"startingTier" varchar(255) NOT NULL,
	"types" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "monsters" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "monsters_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"link" varchar(255) NOT NULL,
	"img" varchar(255) NOT NULL,
	"rank" varchar(255) NOT NULL,
	"appearsOn" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "monsterItems" ADD CONSTRAINT "monsterItems_monsterId_monsterDetails_id_fk" FOREIGN KEY ("monsterId") REFERENCES "public"."monsterDetails"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "monsterSkills" ADD CONSTRAINT "monsterSkills_monsterId_monsterDetails_id_fk" FOREIGN KEY ("monsterId") REFERENCES "public"."monsterDetails"("id") ON DELETE no action ON UPDATE no action;