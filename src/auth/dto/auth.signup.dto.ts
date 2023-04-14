import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  ValidateIf,
} from 'class-validator';

export class AuthSignUpDTO {
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

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @Matches(/^[6-9]\d{9}$/, {
    message: 'Mobile number must be a valid Indian mobile number',
  })
  @ValidateIf((object, value) => value !== undefined) // only validate if mobile number is sent as it is optional
  mobileNumber: string | undefined;
}
