import { FastifyReply } from 'fastify';
import { fetchUser } from 'services/userServices';
import { SessionRequest } from 'supertokens-node/framework/fastify';

const getUserMiddleware = async (
  request: SessionRequest,
  reply: FastifyReply
) => {
  const userId = request.session!.getUserId();

  console.log('USERID_MIDDLEWARE', userId);

  let cachedProfile = await request.server.redis.get(`user:${userId}:profile`);
  let userProfile;

  if (!cachedProfile) {
    userProfile = await fetchUser(userId);

    await request.server.redis.set(
      `user:${userId}:profile`,
      JSON.stringify(userProfile),
      'EX',
      60 * 10 // Cache for 10 minutes
    );
  } else {
    userProfile = JSON.parse(cachedProfile);
  }

  request.userData = { userProfile }; // Use dedicated property for user data
};

export default getUserMiddleware;
