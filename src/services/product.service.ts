import { count, eq, ilike } from "drizzle-orm";
import { productsTable } from "../db/schema.ts";
import db from "../utils/db.helper.ts";
import type { Product } from "../types/Product.ts";

export async function getProducts(
  limit: number = 10,
  offset: number = 0,
  search: string
) {
  const products = await db
    .select()
    .from(productsTable)
    .limit(limit)
    .offset(offset)
    .where(search && search.trim() ? ilike(productsTable.name, `%${search}%`) : undefined);

  return products;
}

export async function getProductById(productId: number) {
  const products = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, productId));
  return products[0];
}

export async function deleteProductById(productId: number) {
  const deletedProducts = await db
    .delete(productsTable)
    .where(eq(productsTable.id, productId))
    .returning();
  return deletedProducts[0];
}

export async function createProduct(addProduct: Product) {
  const newId = Date.now();
  const createdProduct = await db
    .insert(productsTable)
    .values({ ...addProduct, id: newId })
    .returning();
  return createdProduct[0];
}

export async function updateProduct(updateProduct: Product) {
  const updatedProduct = await db
    .update(productsTable)
    .set(updateProduct)
    .where(eq(productsTable.id, updateProduct.id))
    .returning();
  return updatedProduct[0];
}

export async function countProduct(search?: string) {
  const countNumber = await db
    .select({ count: count() })
    .from(productsTable)
    .where(search && search.trim() ? ilike(productsTable.name, `%${search}%`) : undefined);
  return countNumber[0]?.count || 0;
}
