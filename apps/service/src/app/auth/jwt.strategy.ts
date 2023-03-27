import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
// import { User, UserDocument } from '@nastracke/share';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@wiremon';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "secretkey",
    });
  }

  async validate(payload: any): Promise<User> { 
      
    const user = await this.UserModel.findOne({ email:payload.email })    
    if (!user) throw new UnauthorizedException()

    return user;
  }
}
