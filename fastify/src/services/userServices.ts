import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { profiles, subscriptions, users } from '@db/schema';

export const createUserAndProfile = async (
  id: string,
  email: string
): Promise<void> => {
  await db.transaction(async (trx) => {
    // Check if the user already exists
    const existingUser = await trx.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!existingUser) {
      await trx.insert(users).values({
        id,
        email,
      });
      await trx.insert(profiles).values({
        userId: id,
      });
      await trx.insert(subscriptions).values({
        userId: id,
      });
    }
  });
};

export const fetchUser = async (userId: string) => {
  return db.query.users.findFirst({
    where: eq(users.id, userId),
  });
};
