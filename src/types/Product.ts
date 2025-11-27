import { productsTable } from "../db/schema.ts";

export type NewProduct = typeof productsTable.$inferInsert;
export type Product = typeof productsTable.$inferSelect;
