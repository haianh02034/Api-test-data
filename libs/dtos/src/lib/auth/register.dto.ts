import { Match } from '@class-validator';
import { USER_ROLES } from '@utils';
import { Expose, Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Expose()
  @Transform(({ value }) => `${value || USER_ROLES.AGENT}`.trim().toUpperCase())
  @IsEnum(USER_ROLES)
  role: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password too weak' })
  password: string;

  @IsNotEmpty()
  @Match('password', { message: 'Password do not match' })
  passwordConfirmation: string;
  
  @IsOptional()
  @IsString()
  phone?: string;

}
