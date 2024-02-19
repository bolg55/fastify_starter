import Session from 'supertokens-node/recipe/session';
import { db } from '@db/index'; // Ensure correct import path
import { FastifyReply, FastifyRequest } from 'fastify';
import { profiles, subscriptions, users } from '@db/schema';
import { eq } from 'drizzle-orm';

const getUserMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const session = await Session.getSession(request, reply);
    const userId = session.getUserId();

    let userProfile;

    try {
      userProfile = await request.server.redis.get(`user:${userId}:profile`);
    } catch (error) {
      console.error('Error fetching user profile from cache:', error);
    }

    if (!userProfile) {
      userProfile = await db
        .select({
          id: users.id,
          email: users.email,
          userName: profiles.userName,
          subscriptions: subscriptions,
        })
        .from(users)
        .leftJoin(profiles, eq(users.id, profiles.userId))
        .leftJoin(subscriptions, eq(users.id, subscriptions.userId))
        .where(eq(users.id, userId));

      await request.server.redis.set(
        `user:${userId}:profile`,
        JSON.stringify(userProfile),
        'EX',
        60 * 10 // Cache for 10 minutes
      );
    } else {
      userProfile = JSON.parse(userProfile);
    }

    request.userData = { userProfile }; // Use dedicated property for user data
  } catch (error) {
    console.error('Error fetching user profile:', error);
    reply.code(500).send('Internal server error'); // Handle error gracefully
  }
};

export default getUserMiddleware;
