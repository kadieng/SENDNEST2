//import { VerifyUserSignup, VerifyUserSignupSchema } from './../../../../../libs/share/src/schemas/user/verifyUserSignUp.schema';
import { Module, Controller } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema, VerifyUserSignup, VerifyUserSignupSchema } from '@wiremon';

@Module({

  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: VerifyUserSignup.name, schema: VerifyUserSignupSchema }
  ]),

  ],
  controllers: [UsersController],
  providers: [UsersService], 
  exports: [UsersService]
})
export class UsersModule { }
