import { User } from '@entity';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { LoginDto, RegisterDto } from '@dtos';
import { GuardJwtService } from '@guards';
import { UserRepoInterface } from '@repositories';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  @Inject('REPOSITORIES.USER')
  private repo: UserRepoInterface;

  @Inject(GuardJwtService)
  private jwtService: GuardJwtService;

  // Initialize the Google OAuth2 client
  private googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  async validateUser(loginData: LoginDto): Promise<User | undefined> {
    const user = await this.repo.findOneBy({ email: loginData.email });
    if (!user) {
      return;
    }

    const check = await compare(loginData.password, user.password);
    if (!check) {
      return;
    }

    return user;
  }

  async register(registerData: RegisterDto): Promise<User | undefined> {
    return this.repo.register(registerData);
  }

  sign(userDto) {
    return this.jwtService.sign(userDto);
  }

  findUser = (id: number) => {
    return this.repo.findByIdOrFail(id);
  };

  // Method to verify Google token
  async verifyGoogleToken(token: string) {
    console.log('GOOGLE_CLIENT_ID',process.env.GOOGLE_CLIENT_ID)
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      return ticket.getPayload();
    } catch (error) {
      throw new UnauthorizedException('Invalid Google token');
    }
  }

  // Handle Google login or registration
  async googleLogin(googleUser) {
    const { email, name, sub: googleId } = googleUser;

    // Check if user already exists in the database
    let user = await this.repo.findOneBy({ email });
    if (!user) {
      // Register the user if they don’t exist
      user = await this.repo.register({
        name,
        email,
        googleId,
        role: 'USER', // Default role for Google users
        permissions: { viewAccountLisence: true, viewAccountUser: false },
        is_active: true,
      });
    }

    // Sign and return a JWT token
    return this.sign({ id: user._id, email: user.email, role: user.role });
  }
}
