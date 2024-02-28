import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const userProfileSchema = z.object({
  userId: z.string().uuid(),
  userName: z.string().nullable(),
});

const userSubscriptionSchema = z.object({
  cancelAtPeriodEnd: z.boolean(),
  isActive: z.boolean(),
  stripeCustomerId: z.string(),
  subStatus: z.enum([
    'trialing',
    'active',
    'canceled',
    'incomplete',
    'incomplete_expired',
    'past_due',
    'unpaid',
    'paused',
    'no_subscription',
  ]),
});

const userSchema = z.object({
  email: z.string().email(),
  id: z.string().uuid(),
  profile: userProfileSchema,
  subscriptions: z.array(userSubscriptionSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const getUserResponseSchema = z.object({
  status: z.enum(['success', 'error']),
  message: z.string(),
  data: userSchema.optional(),
});

const userIdParamsSchema = z.object({
  userId: z.string().uuid(),
});

export type GetUserResponse = z.infer<typeof getUserResponseSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    getUserResponseSchema,
    userIdParamsSchema,
  },
  {
    $id: 'userSchemas',
  }
);
