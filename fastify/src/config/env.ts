import zennv from 'zennv';
import { z } from 'zod';

export const env = zennv({
  dotenv: true,
  schema: z.object({
    PORT: z.number().default(8080),
    HOST: z.string().default('0.0.0.0'),
    DATABASE_CONNECTION: z.string().optional(),
  }),
});
