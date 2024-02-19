import { db } from '@db/index';
import { profiles } from '@db/schema';
import { eq } from 'drizzle-orm';
import { FastifyReply, FastifyRequest } from 'fastify';

export const getMeHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const fetchedUser = request.userData?.userProfile;

    if (!fetchedUser) {
      // Send error response
      reply.code(404).send({
        status: 'error' as 'error',
        message: 'User not found',
      });
      return;
    }

    // Send success response
    reply.code(200).send({
      status: 'success' as 'success',
      message: 'User fetched successfully',
      data: fetchedUser,
    });
  } catch (error) {
    // Type-guard to ensure error has a 'message' property
    if (error instanceof Error) {
      request.log.error(`Error fetching user: ${error.message}`); // Safe to access 'message'
    } else {
      request.log.error('Unknown error occurred'); // Handle non-Error instances
    }

    // Send error response
    reply.code(500).send({
      status: 'error' as 'error',
      message: 'Failed to fetch user',
    });
  }
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

  try {
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
      status: 'success' as 'success',
      message: 'User updated successfully',
      data: updatedUserProfile,
    });
  } catch (error) {
    // Type-guard to ensure error has a 'message' property
    if (error instanceof Error) {
      request.log.error(`Error updating user: ${error.message}`); // Safe to access 'message'
    } else {
      request.log.error('Unknown error occurred'); // Handle non-Error instances
    }

    // Send error response
    reply.code(500).send({
      status: 'error' as 'error',
      message: 'Failed to update user',
    });
  }
};
