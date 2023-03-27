import { VerifyUserSignup, VerifyUserSignupSchema } from './../../../../../libs/share/src/schemas/user/verifyUserSignUp.schema';
import { Module, Controller } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@wiremon';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports:[
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: VerifyUserSignup.name, schema: VerifyUserSignupSchema }])
  
  ],
  exports:[UsersService]
})
export class UsersModule {}
