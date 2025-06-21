import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DB_Password: z.string().min(1),
    DB_User: z.string().min(1),
    DB_Host: z.string().min(1),
    DB_Port: z.string().min(1),
    DB_Name: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
  },
  createFinalSchema: env => {
    return z.object(env).transform(val => {
      const { DB_Password, DB_User, DB_Host, DB_Port, DB_Name, ...rest } = val;
      return {
        ...rest,
        DATABASE_URL: `postgresql://${DB_User}:${DB_Password}@${DB_Host}:${DB_Port}/${DB_Name}`,
      };
    });
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
})