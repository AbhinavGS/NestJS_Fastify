import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    return hash;
  }

  signin(dto: AuthDto) {
    return 'signed in from service';
  }
}
