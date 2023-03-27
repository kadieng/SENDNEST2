import { VerifyUserSignup, VerifyUserSignupDocument } from './../../../../../../libs/share/src/schemas/user/verifyUserSignUp.schema';
import { generatePass } from './../../../../../../libs/share/src/Hashing/hashPassword';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, UpdateUserDto, UpdateUserInterface, User, UserDocument, UserInterface, verifyTokenInterface } from '@wiremon';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { gen } from 'n-digit-token';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
    @InjectModel(VerifyUserSignup.name) private readonly UserSignupModel: Model<VerifyUserSignupDocument>

  ) { }

  async create(createUserDto: CreateUserDto) {
    try {

      const saltOrRounds = 10;
      const data = { ...createUserDto }
      data.password = await bcrypt.hash(data.password, saltOrRounds);

      const token: string = gen(6);

      const user = await this.UserModel.create(data);

      const verifyToken = await this.UserSignupModel.create({ email: user.email, otp: token });

      return user;

    } catch (error) {

      console.log(error.massage);
      return error.message
    }

  }

  async findAll(): Promise<User[]> {
    return this.UserModel.find()
  }

  async getUser(email: string): Promise<User> {
    const user = await this.UserModel.findOne({ email });
    if (!user) {
      throw new NotFoundException("user not found");
    }
    return user;

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
      const deleteUser = await this.UserModel.findByIdAndDelete({ _id: id });
      return deleteUser;
    } catch (error) {
      return error.massage;
    }

  }

  async verifyUserToken(payload: verifyTokenInterface): Promise<Object> {
    try {

      const verifyUser = await this.UserSignupModel.findOne({ email: payload.email });

      if (verifyUser.otp == payload.otp) {
        const updateUser = await await this.UserModel.findOneAndUpdate({ email: verifyUser.email }, { IsVerified: true }, { new: true }).select('-__v -password');
        return {
          user: updateUser,
          "message": "verification successful"
        };
      } else {
        return { "massage": "verification not successful" }
      }

      return { "message": "not found" }

    } catch (error) {
      return error.massage;
    }

  }


}