CREATE TABLE "monsters" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "monsters_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"link" varchar(255) NOT NULL,
	"img" varchar(255) NOT NULL,
	"rank" varchar(255) NOT NULL,
	"appearsOn" varchar(255) NOT NULL
);
