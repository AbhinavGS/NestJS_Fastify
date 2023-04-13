import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup() {
    return 'signed up from service';
  }

  signin() {
    return 'signed in from service';
  }
}
