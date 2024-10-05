import { Injectable } from '@nestjs/common';
import { AuthDto, GoogleDto, SignDto } from 'src/dto';
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
    const accessToken = this.generateJwtToken(user.id, user.email,user.isAdmin);

    return {
      accessToken,
      user,
      success: true,
    };
  }
  async google(dto: GoogleDto) {
    // Check if the user already exists based on the email provided
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // If the user exists
    if (user) {
      delete user.password; // Omit the password from the user object

      // Generate JWT token
      const accessToken = this.generateJwtToken(user.id, user.email,user.isAdmin);

      return {
        accessToken,
        user,
        success: true,
        message: 'User signed in successfully',
      };
    } else {
      // Generate a random password for new users
      const randomPassword = Array.from({ length: 12 }, () =>
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?".charAt(Math.floor(Math.random() * 94))
      ).join('');

      // Hash the randomly generated password
      const hashed = await bcrypt.hash(randomPassword, 10);

      // Create a new user
      const newUser = await this.prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          password: hashed,
          photourl: dto.photourl || 'https://i.pinimg.com/474x/cb/45/72/cb4572f19ab7505d552206ed5dfb3739.jpg', // Default photo URL if not provided
        },
      });

      // Generate JWT token for the new user
      const accessToken = this.generateJwtToken(newUser.id, newUser.email,newUser.isAdmin);

      return {
        accessToken,
        user: newUser, // Return the newly created user
        success: true,
        message: 'User created successfully',
      };
    }
  }
  
  


  private generateJwtToken(userId: number, email: string,isAdmin:boolean) {
    const payload = { sub: userId, email,isAdmin };
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('SECRET_KEY'),
      expiresIn: '1h',
    });
  }  
    }
  
  