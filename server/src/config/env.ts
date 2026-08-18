import dotenv from 'dotenv';

dotenv.config();

const mustGet = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing env: ${key}`);
  return value;
};

export const config = {
  NODE_ENV: mustGet('NODE_ENV'),
  PORT: mustGet('PORT'),
  DATABASE_URL: mustGet('DATABASE_URL'),
  REDIS_URL: mustGet('REDIS_URL'),
  jwt: {
    secret: mustGet('JWT_ACCESS_SECRET'),
    refreshSecret: mustGet('JWT_REFRESH_SECRET'),
    accessExpiresIn: process.env['JWT_ACCESS_EXPIRES_IN'] ?? '15m',
    refreshExpiresInDays: Number(
      process.env['JWT_REFRESH_EXPIRES_IN_DAYS'] ?? 7,
    ),
  },
  SALT_ROUNDS: mustGet('SALT_ROUNDS'),
};
