import { FastifyReply, FastifyRequest } from 'fastify';
import { fetchUser } from 'services/userServices';

const getUserMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const userId = request.session!.getUserId();

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
