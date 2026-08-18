import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export interface AccessTokenPayload {
  sub: string; // adminId
  role: string;
  sid: string; // session id
}

export interface RefreshTokenPayload {
  sid: string;
}

export function signAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.accessExpiresIn as NonNullable<
      jwt.SignOptions['expiresIn']
    >,
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, config.jwt.secret) as AccessTokenPayload;
}

export function signRefreshToken(payload: RefreshTokenPayload): string {
  return jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: `${config.jwt.refreshExpiresInDays}d`,
  });
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return jwt.verify(token, config.jwt.refreshSecret) as RefreshTokenPayload;
}
