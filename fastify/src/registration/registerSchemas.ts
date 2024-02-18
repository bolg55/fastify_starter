import { FastifyInstance } from 'fastify';
// Schema
import { userSchemas } from 'schemas/userSchemas';

const schemas = [...userSchemas];

export const registerSchemas = async (
  fastifyInstance: FastifyInstance
): Promise<void> => {
  for (const schema of schemas) {
    await fastifyInstance.addSchema(schema);
  }
};
