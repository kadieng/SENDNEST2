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
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto, UserInterface, UpdateUserDto, verifyTokenInterface } from "@wiremon";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { updatePasswordInterface } from "libs/share/src/interfaces/user/updatePass.interface";
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,

  ) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserInterface> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('/verify_user_token')
  verifyUserOtp(@Body() payload: verifyTokenInterface) {
    return this.usersService.verifyUserToken(payload);
  }

  @Post(':id/password_update')
  async updatePassword(@Param() id: string, @Body() payload: updatePasswordInterface) {
    return this.usersService.updateUserPassword(id, payload);
  }

  @Post('/reset-password')
  async resetPassword(@Body() payload: any) {
    return await this.usersService.resetPassword(payload);
  }

  @Get('/reset-password/:id/:token')
  async verifyResetPasswords(@Param() id: string, token: string) {
    return await this.usersService.verifyResetPassword(id, token);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.usersService.uploadImageToCloudinary(file);
  }

}
