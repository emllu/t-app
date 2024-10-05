import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

  export class AuthDto{
   @IsString()
   @IsString()
   username:string
   
        @IsEmail()
        @IsNotEmpty()
           email:string;
           @IsString()
           @IsNotEmpty()
           password:string
        }
        export class SignDto{
         @IsEmail()
         @IsNotEmpty()
            email:string;
            @IsString()
            @IsNotEmpty()
            password:string
        }
        export class GoogleDto {
         @IsString()
         username: string;
       
         @IsEmail()
         email: string;
       
         @IsOptional()
         @IsString()
         photourl?: string;
       }
       export class PostDto{
         @IsString()
         @IsOptional()
        content?: string;
      
        @IsOptional()
         @IsString()
        category: string;
        @IsOptional()
         @IsString()
         image?: string;
         @IsNotEmpty()
         @IsString()
          title: string;
       }