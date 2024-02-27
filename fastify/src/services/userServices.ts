import { db } from '@db/index';
import { eq } from 'drizzle-orm';
import { profiles, subscriptions, users } from '@db/schema';

export const createUser = async (id: string, email: string): Promise<void> => {
  // Check if the user already exists
  await db.transaction(async (tx) => {
    const existingUser = await tx.query.users.findFirst({
      where: eq(users.id, id),
    });

    // If the user doesn't exist, create a new user
    // and create a new profile and subscription for the user

    if (!existingUser) {
      await tx.insert(users).values({
        id,
        email,
      });
      await tx.insert(profiles).values({
        userId: id,
      });
      await tx.insert(subscriptions).values({
        userId: id,
      });
    }
  });
};

export const fetchUser = async (userId: string) => {
  return db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      profile: {
        columns: {
          userId: true,
          userName: true,
        },
      },
      subscriptions: {
        columns: {
          stripeCustomerId: true,
          isActive: true,
          subStatus: true,
          cancelAtPeriodEnd: true,
        },
      },
    },
  });
};
