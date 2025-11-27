import { usersTable } from "../db/schema.ts";
import bcrypt from "bcrypt";
import db from "../utils/db.helper.ts";
import { eq } from "drizzle-orm";

export async function createUser(email: string, password: string) {
  const encryptedPassword = await bcrypt.hash(password, 10);

  const createdUser = await db
    .insert(usersTable)
    .values({
      id: Date.now(),
      email,
      password: encryptedPassword,
    })
    .returning();

  return createdUser[0];
}

export async function verifyUser(email: string, password: string) {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (user.length === 0) {
    return false;
  }

  const result = await bcrypt.compare(password, user[0]!.password);

  return result;
}
