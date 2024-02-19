import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const updateUserSchema = z.object({
  userName: z.string().optional(),
});

export const { schemas: meSchemas, $ref } = buildJsonSchemas(
  {
    updateUserSchema,
  },
  {
    $id: 'meSchemas',
  }
);
