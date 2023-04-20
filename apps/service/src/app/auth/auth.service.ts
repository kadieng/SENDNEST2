import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/service/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,

  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(username);

    const isMatch = await bcrypt.compare(password, user.password);


    if (user && isMatch) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: any) {
    try {
      const check = await this.validateUser(user.email, user.password);
     
      if (check) {
        if (check.IsVerified == true) {
          const payload = { email: user.email };
          return { access_token: this.jwtService.sign(payload) }
        }  
        return {message:"user not verified"}
      } else {
        return { message: "invalide details" }
      }
    } catch (error) {
      return error.message;
    }
  }
}
