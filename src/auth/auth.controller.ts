import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignInDTO, AuthSignUpDTO } from './dto';

@Controller('auth') // auth will be added to route
export class AuthController {
  constructor(private authService: AuthService) {} // dependency injection
  @Post('signup') // route => auth/signup
  signup(@Body() dto: AuthSignUpDTO) {
    return this.authService.signup(dto);
  }

  @Post('signin') // route ==> auth/signin
  signin(@Body() dto: AuthSignInDTO) {
    console.log(dto);
    return this.authService.signin(dto);
  }
}
