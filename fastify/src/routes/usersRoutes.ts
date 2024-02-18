import { FastifyInstance } from 'fastify';
import { getUserHandler } from 'controllers/usersControllers';
import { $ref } from 'schemas/userSchemas';

const userRoutes = async (server: FastifyInstance) => {
  server.route({
    method: 'GET',
    url: '/:userId',
    schema: {
      tags: ['Users'],
      response: {
        200: $ref('getUserResponseSchema'),
      },
    },
    handler: getUserHandler,
  });
};

export default userRoutes;
