import { db } from '@db/index';
import { profiles } from '@db/schema';
import { eq } from 'drizzle-orm';
import { FastifyReply, FastifyRequest } from 'fastify';

export const getMeHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const fetchedUser = request.userData?.userProfile;

  if (!fetchedUser) {
    // Send error response
    reply.code(404).send({
      status: 'error',
      message: 'User not found',
    });
    return;
  }

  // Send success response
  reply.code(200).send({
    status: 'success',
    message: 'User fetched successfully',
    data: fetchedUser,
  });
};

export const updateMeHandler = async (
  request: FastifyRequest<{
    Body: {
      userName: string;
    };
  }>,
  reply: FastifyReply
) => {
  const userProfile = request.userData?.userProfile;
  const userId = userProfile[0].id;
  const { userName } = request.body;

  console.log('USER PROFILE', userProfile);

  await db
    .update(profiles)
    .set({ userName })
    .where(eq(profiles.userId, userId));

  const updatedUserProfile = {
    ...userProfile[0],
    userName,
  };

  await request.server.redis.set(
    `user:${userId}:profile`,
    JSON.stringify(updatedUserProfile),
    'EX',
    60 * 60 * 24
  );

  // Send success response
  reply.code(200).send({
    status: 'success',
    message: 'User updated successfully',
    data: updatedUserProfile,
  });
};
