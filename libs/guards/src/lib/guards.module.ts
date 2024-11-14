import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConfig } from './configs';
import { GuardJwtService } from './guard-jwt.service';
import { JwtRefreshStrategy, JwtStrategy } from './strategies';

@Global()
@Module({
  imports: [PassportModule, JwtModule.register(jwtConfig)],
  providers: [JwtStrategy, JwtRefreshStrategy, GuardJwtService],
  exports: [GuardJwtService],
})
export class GuardsModule {}
