import { Body, Controller, Delete, Get, Next, Post, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, CommentDto, GoogleDto, PostDto, SignDto } from 'src/dto';
import { Response } from 'express';
import {AuthGuard} from '../guards/auth/auth.guard'
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
    // res.cookie('accessToken', result.accessToken, {
    //   httpOnly: true,
    //   sameSite: 'lax',
    //   maxAge: 3600000, // 1 hour
    // });
    
  
    return res.json({
      user: result.user,
      token:result.accessToken,
      success: true,
    });
  }

  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
  @Post('google')
  async google(@Body() dto: GoogleDto, @Res() res: Response) {
    // Validate DTO
    if (!dto || !dto.email || !dto.username) {
      return res.status(400).json({
        message: 'Invalid data provided',
        success: false,
      });
    }

    const result = await this.authService.google(dto);

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
  @UseGuards(AuthGuard)
  @Get('getposts')
async getPosts(@Req() req, @Query() query , @Res() res: Response) {
  try {
    console.log(req.user)
    const result = await this.authService.getPosts(query,req.user);
    
    return res.status(200).json({
      message: "Posts fetched successfully",
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch posts",
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
}

  @UseGuards(AuthGuard)
  @Post('post')
   async createPost(@Body() dto:PostDto ,@Req() req,@Res() res){
    const result = await this.authService.createPost(dto,req.user);
    if (!result.success) {
      return res.status(401).json({
        message: result.message,
        success: false,
      });
    }

    // Set the cookie with the access token
  

    return res.status(201).json({
     data:result.data,
      success: true,
      result
    });
  }
  // @UseGuards(AuthGuard)
  // @Post('delete-post')
 
  //   async deletePost(@Query() query,@Req() req,@Res() res,){
  //   const result = await this.authService.del(req.user,query);
  //   if (!result.success) {
  //     return res.status(401).json({
  //       message: result.message,
  //       success: false,
  //     });
  //   }

  //    return res.status(201).json({
  //  message:result.message,
  //     success: true,
  //   });
  // }
  @UseGuards(AuthGuard)
@Get('getusers')
async getUser(@Query() query, @Req() req, @Res() res) {
  try {
    const result = await this.authService.getUsers(req.user, query);
    return res.status(200).json({
      users: result.users,
      totalUsers: result.totalUsers,
      lastMonthUsers: result.lastMonthUsers,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch users',
      error: error.message,
    });
  }
}
@UseGuards(AuthGuard)
@Delete('delete')
async deleteUser(@Query() query, @Req() req, @Res() res) {
  const result = await this.authService.Deleteuser(req.user);
  if (!result.success) {
    return res.status(401).json({
      message: result.message,
      success: false,
    });
  }
  return res.status(201).json({
    message: result.message,
    success: true,
  });
}

 @Get('/getpostcomment')
async getComment(@Query() query ,@Req() req ,@Res() res){
  const result = await this.authService.getpostComment(query);
  if (!result.success) {
    return res.status(401).json({
      message: result.message,
      success: false,
    });
  }

   return res.status(201).json({
 message:result.message,
    success: true,
    result
  })


 }
 @UseGuards(AuthGuard)
 @Put('like-comment')
async likes(@Query() query ,@Req() req ,@Res() res){
  const result = await this.authService.likes(query,req.user);
  if (!result.success) {
    return res.status(401).json({
      message: result.message,
      success: false,
    });
  }

   return res.status(201).json({
 message:result.message,
    success: true,
    result
  })

 }
 @Post('comment')
 async createComment(dto:CommentDto,@Query() query,@Req() req,@Res() res){
  const result = await this.authService.createComment(dto);
  if (!result.success) {
    return res.status(401).json({
      message: result.message,
      success: false,
    });
  }

   return res.status(201).json({
 message:result.message,
    success: true,
    result
  })

 }
 @Get('getcomments')
 async getComments(dto:CommentDto,@Query() query,@Req() req,@Res() res){
  const result = await this.authService.getComments(query);
  if (!result.success) {
    return res.status(401).json({
      message: result.message,
      success: false,
    });
  }

   return res.status(201).json({
 message:result.message,
    success: true,
    result
  })

 }
 @UseGuards(AuthGuard)
 @Delete('delete-comment')
 async deleteComment(dto:CommentDto,@Query() query,@Req() req,@Res() res){
  const result = await this.authService.deleteComment(query,req.user);
  if (!result.success) {
    return res.status(401).json({
      message: result.message,
      success: false,
    });
  }

   return res.status(201).json({
 message:result.message,
    success: true,
  })

 }
}