import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { users } from '@db/schema';

export const createUser = async (id: string, email: string): Promise<void> => {
  // Check if the user already exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.id, id),
  });

  if (!existingUser) {
    await db.insert(users).values({
      id,
      email,
    });
  }
};

export const fetchUser = async (userId: string) => {
  return db.query.users.findFirst({
    where: eq(users.id, userId),
  });
};
