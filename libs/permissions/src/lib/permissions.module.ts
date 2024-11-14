import { Global, Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtIfHasAuthGuard } from '@guards';

@Global()
@Module({
  providers: [
    {
      provide: 'PERMISSIONS',
      useClass: PermissionsService,
    },
    {
      provide: APP_GUARD,
      useClass: JwtIfHasAuthGuard,
    },
  ],
  exports: ['PERMISSIONS'],
})
export class PermissionsModule {}
