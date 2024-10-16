import { Injectable } from '@nestjs/common';
import { AuthDto, CommentDto, GoogleDto, PostDto, SignDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Post } from '@prisma/client';

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
    const accessToken = this.generateJwtToken(user.id, user.email, user.isAdmin);
  
    // Add the access token to the user object
    return {
      
       user,
       accessToken, // Attach access token to the user object
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
  async createPost(dto: PostDto, user: any) {
    // Input validation
    console.log(user)
    if (!dto.title || typeof dto.title !== 'string') {
      return {
        message: 'Title is required and must be a string',
        success: false,
      };
    }

    // Check if user is an admin
    if (!user.isAdmin) {
      return {
        message: 'Only admins can create posts',
        success: false,
      };
    }

    // Generate slug from title
    const slug = dto.title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '-');

    try {
      // Create post in the database
      const postData = await this.prisma.post.create({
        data: {
          title: dto.title,
          content: dto.content || 'none',
          category: dto.category || 'unCategorized',
          image: dto.image||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWjPJ_O0S5btxCavEVpCk-Q9YhYUXCrFTmaA&s",
          slug,
          userid: user.sub, // Ensure user ID is attached to post
        },
      });

      return {
        message: 'Post created successfully',
        success: true,
        data: postData,
      };
    } catch (error) {
      console.error('Error creating post:', error); // Log the error details
      return {
        message: 'Error creating post: ' + (error.message || 'Unknown error'),
        success: false,
      };
    }
    
  }
  async getPosts( query: any,user: any): Promise<{
    posts: any[];
    totalPosts: number;
    lastMonthPosts: number;
  }> {
  console.log("user",user)
    if (!user.isAdmin) {

      console.log(user)
      throw new Error('You do not have permission to view posts.');
    }
  
    const startIndex = parseInt(query.startIndex) || 0; // Pagination start index
    const limit = parseInt(query.limit) || 9; // Pagination limit
    const sortDirection = query.order === 'asc' ? 'asc' : 'desc'; // Sort direction
  
    // Fetch posts with filtering, pagination, and sorting
    const [posts, totalPosts, lastMonthPosts] = await Promise.all([
      this.prisma.post.findMany({
        where: {
          ...(query.userid && { userid: Number(query.userid) }), // Filter by userid if provided
          ...(query.category && { category: query.category }), // Filter by category if provided
          ...(query.slug && { slug: query.slug }), // Filter by slug if provided
          ...(query.searchTerm && {
            OR: [
              { title: { contains: query.searchTerm } }, // Case-insensitive title search
              { content: { contains: query.searchTerm } }, // Case-insensitive content search
            ],
          }),
        },
        orderBy: { updatedAt: sortDirection }, // Order by updatedAt
        skip: startIndex, // Pagination skip
        take: limit, // Pagination limit
      }),
      this.prisma.post.count(), // Total post count
      this.prisma.post.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setMonth(new Date().getMonth() - 1)), // Count posts created in the last month
          },
        },
      }),
    ]);
  
    return {
      posts,
      totalPosts,
      lastMonthPosts,
    };
  }
  async getUsers(user: any, query: any): Promise<{
    users: any[];  
    totalUsers: number;
    lastMonthUsers: number;
  }> {
   
    if (!user.isAdmin) {
      throw new Error('You do not have permission to view users.');
    }
  
    const startIndex = parseInt(query.startIndex) || 0;
    const limit = parseInt(query.limit) || 9;
    const sortDirection = query.order === 'asc' ? 'asc' : 'desc'; 
  
    
    const [users, totalUsers, lastMonthUsers] = await Promise.all([
      this.prisma.user.findMany({
        orderBy: { updatedAt: sortDirection },
        skip: startIndex,
        take: limit,
      }),
      this.prisma.user.count(),
      this.prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
          },
        },
      }),
    ]);
  
    return {
      users,
      totalUsers,
      lastMonthUsers,
    };
  }
  
    async Deleteuser(query){
      const userid=parseInt(query.id)
      if(!userid){
        return {
          message:"pls provide the userid",
          success:false
        }}
        else{
          await this.prisma.user.delete({
            where:{
              id:userid
            }
          })
          return {
            message:'user deleted',
            success:true
          }
        
      }
    }
 
    async getpostComment(query) {
      const comments = await this.prisma.comment.findMany({
        where: {
          postId: query.postId,
        },
        orderBy: {
          createdAt: 'desc', 
        },
      });
      
      return {
        message: comments,
        success: true,
      };
    }
   
    async likes(query, user) {
      const comment = await this.prisma.comment.findFirst({
        where: {
          id: query.commentId,
        },
      });
    
      if (!comment) {
        return {
          message: "Comment not found",
          success: false,
        };
      } else {
       
        const userLike = await this.prisma.like.findFirst({
          where: {
            userId: user.id,
            commentId: query.commentId,
          },
        });
    
        if (userLike) {
        
          await this.prisma.like.delete({
            where: {
              id: userLike.id,
            },
          });
    

          await this.prisma.comment.update({
            where: {
              id: query.commentId,
            },
            data: {
              numberOfLikes: comment.numberOfLikes - 1,
            },
          });
    
          return {
            message: "Like removed",
            success: true,
          };
        } else {
         
          await this.prisma.like.create({
            data: {
              userId: user.id,
              commentId: query.commentId,
            },
          });
    
          
          await this.prisma.comment.update({
            where: {
              id: query.commentId,
            },
            data: {
              numberOfLikes: comment.numberOfLikes + 1,
            },
          });
    
          return {
            message: "Like added",
            success: true,
          };
        }
      }
    }
    async getComments(query) {
      const startIndex = parseInt(query.startIndex) || 0; 
      const limit = parseInt(query.limit) || 9; 
      const sortDirection = query.order === 'asc' ? 'asc' : 'desc';
      
      
      const comments = await this.prisma.comment.findMany({
        orderBy: { createdAt: sortDirection },
        skip: startIndex,
        take: limit,
      });
    
      // Count total number of comments
      const totalComments = await this.prisma.comment.count();
    
      // Get the date from one month ago
      const now = new Date();
      const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    
      // Count comments from the last month
      const lastMonthComments = await this.prisma.comment.count({
        where: {
          createdAt: {
            gte: oneMonthAgo,
          },
        },
      });
    
      // Return the results
      return {
        message: "Comments fetched successfully",
        success: true,
        comments,
        totalComments,
        lastMonthComments,
      };
    }
    async createComment(dto: CommentDto) {
      try {
          const newComment = await this.prisma.comment.create({
              data: {
                  content: dto.content,
                  postId: dto.postId,
                  userId: dto.userId,
              },
          });
  
          return {
              message: "Comment created",
              success: true,
              data: newComment,
          };
      } catch (error) {
          console.error(error);  // Log the error for debugging
          return {
              message: "Failed to create comment",
              success: false,
          };
      }
  }
  
 
    async deleteComment(query, user: any) {
      const comment = await this.prisma.comment.findUnique({
        where: { id: query.commentId },
      });
  
      if (!comment) {
     return {
        message:"comment not found",
        success:false
      } 
    }
      
      if (comment.userId !== user.id && !user.isAdmin) {
        return {
          message:"you are not allwoed",
          success:false
        
        }
      }
  else{
    await this.prisma.comment.delete({
      where: { id: query.commentId },
    });

    return { message: 'Comment has been deleted' };
  }
  
}

  

  private generateJwtToken(userId: number, email: string,isAdmin:boolean) {
    const payload = { sub: userId, email,isAdmin };
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('SECRET_KEY'),
      expiresIn: '6h',
    });
  }  
  }