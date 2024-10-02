import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
 imports:[PrismaModule,JwtModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
