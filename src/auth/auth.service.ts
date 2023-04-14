import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { AuthSignInDTO, AuthSignUpDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signup(dto: AuthSignUpDTO) {
    const hash = await argon.hash(dto.password); // hash password string using argon2
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
          mobileNumber: dto.mobileNumber,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002' && error.meta.target[0] === 'mobileNumber') {
          throw new ForbiddenException(
            'Entered mobile number is already registered',
          );
        } else {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthSignInDTO) {
    // find user in db
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user not present, throw error
    if (!user) throw new ForbiddenException('Credentials incorrect');
    // if user is present, verify password
    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
