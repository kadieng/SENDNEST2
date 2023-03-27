import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from '@wiremon';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/service/users.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // EmailModule,
    // CloudinaryModule,
    JwtModule.register({
      secret: "secretkey",
      signOptions: { expiresIn: '12h' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,UsersService],
  exports: [AuthService, JwtStrategy, PassportModule],

})
export class AuthModule {}
