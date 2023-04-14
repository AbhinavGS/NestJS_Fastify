import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), //config module will available globally with explicit import in particular module
    AuthModule,
    PrismaModule,
    MovieModule,
  ],
})
export class AppModule {}
