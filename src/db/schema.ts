import { bigint, pgTable, real, varchar } from "drizzle-orm/pg-core";

export const productsTable = pgTable("tb_product", {
  id: bigint({ mode: "number" }).primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  tag: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  picture: varchar({ length: 255 }),
  price: real(),
  price_min: real(),
  price_max: real(),
});

export const usersTable = pgTable("tb_user", {
  id: bigint({ mode: "number" }).primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  // TODO:密码长度在8到100之间
  password: varchar({ length: 100 }).notNull(),
});
