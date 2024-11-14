import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: process?.env?.GUARD_JWT_SECRET || 'JWT_SECRET',
  signOptions: {
    expiresIn: process?.env?.GUARD_JWT_EXPIRE || '60m',
  },
};

export const jwtRefreshTtl = parseInt(process?.env?.GUARD_JWT_REFRESH_TTL, 10) || 20160;
