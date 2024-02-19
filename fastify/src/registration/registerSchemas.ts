import { FastifyInstance } from 'fastify';
import { meSchemas } from 'schemas/meSchemas';
// Schema
import { userSchemas } from 'schemas/userSchemas';

const schemas = [...userSchemas, ...meSchemas];

export const registerSchemas = async (
  fastifyInstance: FastifyInstance
): Promise<void> => {
  for (const schema of schemas) {
    await fastifyInstance.addSchema(schema);
  }
};
