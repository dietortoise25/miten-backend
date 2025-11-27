CREATE TABLE "tb_product" (
	"id" bigint PRIMARY KEY DEFAULT nextval('tb_product_id_seq'::regclass) NOT NULL,
	"name" varchar(255) NOT NULL,
	"tag" varchar(255) NOT NULL,
	"description" varchar(255),
	"picture" varchar(255),
	"price" real,
	"price_min" real,
	"price_max" real
);
--> statement-breakpoint
CREATE TABLE "tb_user" (
	"id" bigint PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(100) NOT NULL,
	CONSTRAINT "tb_user_email_unique" UNIQUE("email")
);
