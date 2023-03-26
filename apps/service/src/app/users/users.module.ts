import { Module, Controller } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@wiremon';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports:[MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),]
  
})
export class UsersModule {}
