import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignDto } from 'src/dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signin(@Body() dto: SignDto, @Res() res: Response) {
    const result = await this.authService.signin(dto); // Call signin method from AuthService

    if (!result.success) {
      return res.status(401).json({
        message: result.message,
        success: false,
      });
    }

    // Set the cookie with the access token
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Secure flag for production
      
    });

    return res.json({
      user: result.user,
      success: true,
    });
  }

  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
}

