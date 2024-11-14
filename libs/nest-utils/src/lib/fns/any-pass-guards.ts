import { SetMetadata } from '@nestjs/common';
export const AnyPassGuards = (...guards: any[]) => SetMetadata('AnyPassGuards', guards);
