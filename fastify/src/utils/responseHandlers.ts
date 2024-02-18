import { FastifyReply } from 'fastify';

type SuccessReplyProps = {
  reply: FastifyReply;
  status: number;
  message: string;
  data?: any;
};

type ErrorReplyProps = {
  reply: FastifyReply;
  status: number;
  message: string;
  error?: Error;
  request: any;
};

export const sendSuccess = ({
  reply,
  status,
  message,
  data,
}: SuccessReplyProps) => {
  return reply.code(status).send({
    status: 'success',
    data,
    message,
  });
};

export const sendError = ({
  reply,
  status,
  message,
  error,
  request,
}: ErrorReplyProps) => {
  if (error instanceof Error) {
    request.log.error('Error:', error.message, error.stack);
  }

  return reply.code(status).send({
    status: 'error',
    data: null,
    message,
  });
};
