import { FastifyReply, FastifyRequest } from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    userData?: {
      userProfile?: any; // Adjust type based on your user profile structure
    };
  }
  interface FastifyInstance {
    verifyQstashToken: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}
