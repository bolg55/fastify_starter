import zennv from 'zennv';
import { z } from 'zod';

export const env = zennv({
  dotenv: true,
  schema: z.object({
    PORT: z.number().default(8080),
    HOST: z.string().default('0.0.0.0'),
    DATABASE_CONNECTION: z.string(),
    SUPERTOKENS_CONNECTION_URI: z
      .string()
      .default('https://try.supertokens.io'),
    SUPERTOKENS_API_KEY: z.string().default('tryout-supertokens-api-key'),
    API_DOMAIN: z.string().default('http://localhost:8080'),
    WEBSITE_DOMAIN: z.string().default('http://localhost:5173'),
    UPSTASH_REDIS_REST_TOKEN: z.string(),
    UPSTASH_REDIS_REST_URL: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_PUBLIC_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET: z.string(),
  }),
});
