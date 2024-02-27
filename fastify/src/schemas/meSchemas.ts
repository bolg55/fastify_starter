import { z } from 'zod';
import { buildJsonSchemas } from 'fastify-zod';

const updateUserResponseSchema = z.object({
  status: z.literal('success'),
  message: z.string(),
  data: z.object({
    id: z.string(),
    userName: z.string().nullable(),
  }),
});

const updateUserErrorSchema = z.object({
  status: z.literal('error'),
  message: z.string(),
});

const updateUserSchema = z.union([
  updateUserResponseSchema,
  updateUserErrorSchema,
]);

const updateUserRequestBodySchema = z.object({
  userName: z.string().nullable(),
});

const userProfileSchema = z.object({
  userId: z.string().uuid(),
  userName: z.string().nullable(),
});

const userSubscriptionSchema = z.object({
  cancelAtPeriodEnd: z.boolean(),
  isActive: z.boolean().default(false),
  stripeCustomerId: z.string(),
  subStatus: z
    .enum([
      'trialing',
      'active',
      'canceled',
      'incomplete',
      'incomplete_expired',
      'past_due',
      'unpaid',
      'no_subscription',
    ])
    .default('no_subscription'),
});

const userSchema = z.object({
  createdAt: z.string(),
  email: z.string().email(),
  id: z.string().uuid(),
  profile: userProfileSchema,
  subscriptions: z.array(userSubscriptionSchema),
  updatedAt: z.string(),
});

const getMeResponseSchema = z.object({
  status: z.enum(['success', 'error']),
  message: z.string(),
  data: userSchema.optional(),
});

export type GetMeResponse = z.infer<typeof getMeResponseSchema>;

export const { schemas: meSchemas, $ref } = buildJsonSchemas(
  {
    getMeResponseSchema,
    updateUserSchema,
    updateUserRequestBodySchema,
  },
  {
    $id: 'meSchemas',
  }
);
