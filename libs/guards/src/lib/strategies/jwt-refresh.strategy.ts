import { AuthPayloadDto } from '@dtos';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainClass } from '@nest-utils';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig, jwtRefreshTtl } from '../configs';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConfig.secret,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: AuthPayloadDto & { exp: number }) {
    if (!payload?.exp || Date.now() > (payload.exp + jwtRefreshTtl * 60) * 1000) {
      return;
    }
    return plainClass(AuthPayloadDto, payload);
  }
}
