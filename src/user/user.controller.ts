import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
  @Get('me')
  @UseGuards(JwtGuard)
  getMe() {
    return 'get me';
  }
}
