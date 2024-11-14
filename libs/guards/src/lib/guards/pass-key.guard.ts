import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { passKey } from '../configs';

@Injectable()
export class PassKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    if (!passKey?.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const requestPassKey = request?.headers?.['x-pass-key'] || request?.body?.passKey || request?.query?.passKey;
    return passKey == requestPassKey;
  }
}
