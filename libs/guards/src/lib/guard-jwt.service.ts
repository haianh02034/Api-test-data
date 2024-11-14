import { AuthPayloadDto, UserDto } from '@dtos';
import { User } from '@entity';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainClass } from '@nest-utils';

@Injectable()
export class GuardJwtService {
  @Inject(JwtService)
  private jwtService: JwtService;

  async sign(data: User | UserDto | AuthPayloadDto) {
    const { ...payload } = plainClass(AuthPayloadDto, data);
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
