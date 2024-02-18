import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const userCore = {
  name: z.string().optional(),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
};

const createUserSchema = z.object({
  ...userCore,
});

const createUserResponseSchema = z.object({
  id: z.string().uuid(),
  ...userCore,
});

const getUserResponse = z.object({
  id: z.string().uuid(),
  ...userCore,
});

const getUserResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: getUserResponse,
});

const userIdParamsSchema = z.object({
  userId: z.string().uuid(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    createUserSchema,
    createUserResponseSchema,
    getUserResponseSchema,
    userIdParamsSchema,
  },
  {
    $id: 'userSchemas',
  }
);
