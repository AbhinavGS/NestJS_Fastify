import { IsNotEmpty } from 'class-validator';

export class AuthSignInDTO {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
