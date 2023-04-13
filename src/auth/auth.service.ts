import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  signup(dto: AuthDto) {
    return 'signed up from service';
  }

  signin(dto: AuthDto) {
    return 'signed in from service';
  }
}
