import { LoginDto, RegisterDto, UserDto } from '@dtos';
import { JwtAuthGuard, JwtRefreshAuthGuard, PassKeyGuard } from '@guards';
import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { plainClass } from '@nest-utils';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() inputs: LoginDto) {
    const user = await this.authService.validateUser(inputs);
    if (!user) {
      throw new UnauthorizedException();
    }
    return await this.authService.sign(user);
  }

  @Post('register')
  @UseGuards(PassKeyGuard)
  async register(@Body() inputs: RegisterDto) {
    const user = await this.authService.register(inputs);
    return await this.authService.sign(user);
  }

  @Post('refresh-token')
  @UseGuards(JwtRefreshAuthGuard)
  async refresh(@Req() { user }) {
    return await this.authService.sign(user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
async me(@Req() { user }) {
  try {
    const visitor = await this.authService.findUser(user.id);
    let result = { visitor: plainClass(UserDto, visitor) };
    console.log('Permissions',result);
    return result;
  } catch (error) {
    console.error('Error in me endpoint:', error);
  }
}

@Post('google-login')
async googleLogin(@Body('token') token: string) {
  const googleUser = await this.authService.verifyGoogleToken(token);
  if (!googleUser) {
    throw new UnauthorizedException('Invalid Google token');
  }
  return await this.authService.googleLogin(googleUser);
}
}
