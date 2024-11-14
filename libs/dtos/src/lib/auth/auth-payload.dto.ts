import { Expose } from 'class-transformer';

export class AuthPayloadDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  agent: string;

  @Expose()
  role: string;
}
