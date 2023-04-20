import { VerifyUserSignup, VerifyUserSignupDocument } from './../../../../../../libs/share/src/schemas/user/verifyUserSignUp.schema';
import { generatePass } from './../../../../../../libs/share/src/Hashing/hashPassword';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Beneficiaries, BeneficiariesDocument, CreateUserDto, resetPassword, resetPasswordDocument, UpdateUserDto, UpdateUserInterface, User, UserDocument, UserInterface, verifyTokenInterface } from '@wiremon';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { gen } from 'n-digit-token';
import { updatePasswordInterface } from "libs/share/src/interfaces/user/updatePass.interface";
import { MailingService } from '../../mailing/mailing.service';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from '../../cloudinary/services/cloudinary.service';
import { BenficiariesDto } from "libs/share/src/dtos/user/beneficiaries.dto";
import { BeneficiariesInterface } from "libs/share/src/interfaces/user/beneficiaries.interface";


@Injectable()
export class UsersService {

  constructor(

    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
    @InjectModel(VerifyUserSignup.name) private readonly UserSignupModel: Model<VerifyUserSignupDocument>,
    private readonly sgmail: MailingService,
    private readonly jwtService: JwtService,
    private readonly cloudinary: CloudinaryService,
    @InjectModel(Beneficiaries.name) private readonly BeneficiariesModel: Model<BeneficiariesDocument>,

  ) { }


  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch((error) => {
      console.log(error);
      throw new BadRequestException('Invalid file type.');
    });
  }

  async create(createUserDto: CreateUserDto) {
    try {

      const saltOrRounds = 10;
      const data = { ...createUserDto }
      data.password = await bcrypt.hash(data.password, saltOrRounds);
      let message = 'your sendnest otp is '
      const token: string = gen(6);
      await this.sgmail.sendEmail({ email: data.email, message, otp: token })

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

  async updateUserPassword(id: string, payload: updatePasswordInterface) {
    try {

      const saltOrRounds = 10;
      const user = await this.UserModel.findOne({ id });

      const isMatch = await bcrypt.compare(payload.oldpassword, user.password);

      if (isMatch) {
        let password = await bcrypt.hash(payload.newpassword, saltOrRounds);
        const updated = await this.UserModel.findOneAndUpdate({ _id: user.id }, { password: password }, { new: true })
        return { "message": "password updated succesfully" }
      } else {
        return { "message": "password mismatch" }
      }
    } catch (error) {
      return error;
    }

  }


  async resetPassword(data: any) {
    //make sure user exist
    const user = await this.UserModel.findOne({ email: data.email });

    if (user && user.email !== data.email) {
      return { message: 'user not registered' }
    }

    // user exist create a one time link valide for 15 min
    const secret = user.password
    const payload = {
      email: user.email,
      id: user.id
    }

    const token = this.jwtService.sign(payload)
    const link = `http://localhost:3000/reset-password/${user.id}/${token}`;
    //send email
    const mail = await this.sgmail.sendEmail({ email: data.email, otp: link, message: 'your reset password like is ' })
    // console.log(mail)
    console.log(link)
    return { message: "reset token send to email" }
  }

  async verifyResetPassword(id: string, token: string) {


    try {
      const user = await this.UserModel.findOne({ id })
      console.log(user)
      if (user) {
        let verifytoken = this.jwtService.verify(token, { secret: 'hard!to-guess_secret' });
        console.log(verifytoken);
        return { message: 'successful' }
      }
    } catch (error) {
      return error.message;
    }
  }

  async createBeneficiaries(payload: BenficiariesDto): Promise<BeneficiariesInterface> {
    try {
      const Bene = await this.BeneficiariesModel.create(payload);
      return Bene;
    } catch (error) {
      return error.message;
    }  
  }



}
