import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { users } from '@db/schema';

export const createUserAndProfile = async (
  id: string,
  email: string
): Promise<void> => {
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
