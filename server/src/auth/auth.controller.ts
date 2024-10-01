import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/dto';

@Controller('auth')
export class AuthController {
    constructor(private auth:AuthService){}
        @Post('signin')
        signin(@Body() dto:AuthDto){
            return this.auth.signin()
        
    }
    @Post('signup')
    signup(@Body() dto:AuthDto){
        return this.auth.signup(dto)
    }
}
