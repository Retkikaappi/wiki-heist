CREATE TABLE "items" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "items_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"img" varchar(255) NOT NULL,
	"effect" varchar(255) NOT NULL,
	"cooldown" varchar(255) NOT NULL,
	"ammo" varchar(255) NOT NULL,
	"types" varchar(255) NOT NULL,
	"size" varchar(255) NOT NULL,
	"hero" varchar(255) NOT NULL
);
