import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Matches(
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
    {
      message:
        'Password must be min 8 characters long and must contain at least one letter, one number, one special character',
    },
  )
  password: string;
}
