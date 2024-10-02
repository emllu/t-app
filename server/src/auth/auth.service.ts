import { Injectable } from '@nestjs/common';
import { AuthDto, SignDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private jwtService: JwtService,  // Changed from jWtService to jwtService
  ) {}

  async signup(dto: AuthDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      return {
        message: 'User already exists',
        success: false,
        statusCode: 401,
      };
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: hashedPassword, // Ensure password is hashed
      },
    });

    delete user.password;

    return {
      user: user,
      success: true,
      message: 'User created successfully',
    };
  }

 
  async signin(dto: SignDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      return {
        message: 'Invalid credentials',
        success: false,
      };
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) {
      return {
        message: 'Invalid password',
        success: false,
      };
    }

    delete user.password; // Omit password from the user object

    // Generate JWT token
    const accessToken = this.generateJwtToken(user.id, user.email);

    return {
      accessToken,
      user,
      success: true,
    };
  }

  private generateJwtToken(userId: number, email: string) {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('SECRET_KEY'),
      expiresIn: '1h',
    });
  }
}