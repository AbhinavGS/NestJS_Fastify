import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // auth will be added to route
export class AuthController {
  constructor(private authService: AuthService) {} // dependency injection
  @Post('signup') // route => auth/signup
  signup() {
    return this.authService.signup();
  }

  @Post('signin') // route ==> auth/signin
  signin() {
    return this.authService.signin();
  }
}
