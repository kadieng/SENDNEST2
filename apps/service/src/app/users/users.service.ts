import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, User, UserDocument } from '@wiremon';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
    // private readonly cloudinary: CloudinaryService
  ) { }

  create(createUserDto: CreateUserDto) {
    try {
      const user = this.UserModel.create(createUserDto);
      return user;
    } catch (error) {
      console.log(error.massage);
      return error.message
    }
    
  }

  async findAll(): Promise<User[]> {
    return this.UserModel.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
