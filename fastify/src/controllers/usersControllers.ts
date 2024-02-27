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

  const fetchedUser = await fetchUser(userId);

  // Send success response
  reply.code(200).send({
    status: 'success' as 'success',
    message: 'User fetched successfully',
    data: fetchedUser,
  });
};
