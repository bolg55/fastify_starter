import { FastifyReply, FastifyRequest } from 'fastify';
import { fetchUser } from 'services/userServices';

export const getUserHandler = async (
  request: FastifyRequest<{
    Params: {
      userId: string;
    };
  }>,
  reply: FastifyReply
) => {
  const { userId } = request.params;

  try {
    // Your logic to fetch user

    const fetchedUser = await fetchUser(userId);

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
