import { FastifyReply, FastifyRequest } from 'fastify';
import { SessionRequest } from 'supertokens-node/framework/fastify';

declare module 'fastify' {
  interface FastifyRequest {
    userData?: {
      userProfile?: {
        id: string;
        userId: string;
        userName: string | null;
        email: string;
        subscriptions: {
          cancelAtPeriodEnd: boolean;
          isActive: boolean;
          stripeCustomerId: string;
          subStatus: string;
        }[];
        createdAt: string;
        updatedAt: string;
      };
    };
    session?: SessionRequest['session'];
  }
  interface FastifyInstance {
    verifyQstashToken: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}
