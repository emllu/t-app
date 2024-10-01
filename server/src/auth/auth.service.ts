import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor( private prisma:PrismaService){
        
    }
    async signin(){
        return true
    }
    async signup(dto:AuthDto){
        const exist= await  this.prisma.user.findUnique({
            where:{
                email:dto.email
            }

        })
        if(exist){
            throw new UnauthorizedException({msg:"user already exists",success:false,statusCode: 401})
        }
        const hash=await bcrypt.hash(dto.password,10)
        const user=await this.prisma.user.create({
            data:{
                username:dto.username,
                email:dto.email,
                password:dto.password
            }
        })
        delete user.password
        return {user:user,
            success:true
        }



    }
}
