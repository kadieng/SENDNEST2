import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  Res,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import {
  CreateUserDto,
  UserInterface,
  UpdateUserDto,
  verifyTokenInterface,
  GetUser,
} from '@wiremon';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { updatePasswordInterface } from 'libs/share/src/interfaces/user/updatePass.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { BeneficiariesInterface } from 'libs/share/src/interfaces/user/beneficiaries.interface';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
    @Res() res: Response
  ) {
    const emailExists = await this.usersService.checkEmailExists(
      createUserDto.email
    );
    const userNameExists = await this.usersService.checkUserNameExists(
      createUserDto.username
    );

    if (emailExists) {
      return res.status(200).json({
        statusCode: 400,
        message: 'user email already exist',
        error: 'Bad Request',
      });
    }

    if (userNameExists) {
      return res.status(400).json({
        statusCode: 400,
        message: 'user with username already exist',
        error: 'Bad Request',
      });
    }

    const data = await this.usersService.create(createUserDto);
    return res.status(201).json({
      statusCode: 201,
      message: 'success',
      data,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Res() res: Response) {
    const data = await this.usersService.findAll();
    return res.status(200).json({
      statusCode: 200,
      message: 'success',
      data,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<any> {
    try {
      const data = await this.usersService.findOne(id);
      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data,
      });
    } catch (error) {
      return res.json({
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('/verify_user_token')
  async verifyUserOtp(
    @Body() payload: verifyTokenInterface,
    @Res() res: Response
  ) {
    try {
      const data = await this.usersService.verifyUserToken(payload);

      if (!data) {
        return res.status(400).json({
          statusCode: 400,
          message: 'invalid datails',
          error: 'bad request',
        });
      }

      return res.json({
        statusCode: 201,
        message: 'success',
        data,
      });
    } catch (error) {
      return res.json({
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/password_update')
  async updatePassword(
    @GetUser() user,
    @Body() payload: updatePasswordInterface,
    @Res() res: Response
  ) {
    payload.user = user.id;
    const data = await this.usersService.updateUserPassword(payload);
    if (!data) {
      return res.json({
        statusCode: 400,
        message: 'password mismach',
      });
    }
    return res.json({
      statusCode: 201,
      message: 'success',
      data,
    });
  }

  @Post('/reset-password')
  async resetPassword(
    @Body() payload: any,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const data = await this.usersService.resetPassword(req, payload);
    return res.json({
      statusCode: 201,
      message: 'success',
    });
  }

  @Get('/reset-password/:id/:token')
  async verifyResetPasswords(
    @Param('id') id: string,
    @Param('token') token: string
  ) {
    return await this.usersService.verifyResetPassword(id, token);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.usersService.uploadImageToCloudinary(file);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create/beneficiaries')
  async createBeneficiaries(
    @GetUser() user,
    @Body(ValidationPipe) payload: BeneficiariesInterface,
    @Res() res: Response
  ) {
    payload.user = user.id;
    const data = await this.usersService.createBeneficiaries(payload);
    return res.status(201).json({
      statusCode: 201,
      message: 'success',
      data,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/get_all/beneficiaries')
  async getAllUserBeneficiaries(@GetUser() userId, @Res() res: Response) {
    const data = await this.usersService.getAllUserBeneficiaries(userId.id);
    return res.status(200).json({
      statusCode: 200,
      message: 'success',
      data,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  async getUser(@GetUser() user, @Res() res: Response) {
    const data = await this.usersService.getUser(user.email);
    return res.status(200).json({
      statusCode: 200,
      message: 'success',
      data,
    });
  }
}
