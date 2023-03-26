import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, UpdateUserDto, UpdateUserInterface, User, UserDocument, UserInterface } from '@wiremon';
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

  async findOne(id: string): Promise<UserInterface> {
    return await this.UserModel.findOne({ _id: id }, { __v: 0, password: 0 });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateUserInterface> {
    try {
      const updateUser = await this.UserModel.findByIdAndUpdate({ _id: id }, updateUserDto, { new: true }).select('-__v -password');
      return updateUser;
    } catch (error) {
      console.log(error.message)
      return error.message
    }

  }

  async remove(id: string) {
    try {
      const deleteUser = await this.UserModel.findByIdAndDelete({_id:id});
    } catch (error) {
      return error.massage;
    }
    
  }
}
