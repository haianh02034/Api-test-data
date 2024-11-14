import { TransformBool } from '@nest-utils';
import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';
import { Match } from 'libs/class-validator/src/lib/match.decorator';
import { USER_ROLES } from 'libs/utils/src/lib/constants/user.entity.constant';

export class Edit {
    @IsNotEmpty()
    name: string;
  
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
 

}