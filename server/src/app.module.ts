import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}), AuthModule
    , JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        // or JWT_SECRET if you use that
        signOptions: { expiresIn: '1h' },
      }),
    })
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
