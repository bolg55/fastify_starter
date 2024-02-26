import { FastifyReply, FastifyRequest } from 'fastify';

export const stripeCustomerPortalHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const fetchedUser = request.userData?.userProfile;

    console.log('USER PROFILE:', fetchedUser);

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
