import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Beneficiaries, BeneficiariesSchema, User, UserSchema, VerifyUserSignup, VerifyUserSignupSchema } from "@wiremon";
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/service/users.service';
import { UsersModule } from '../users/users.module';
import { MailingModule } from '../mailing/mailing.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';


@Module({
  imports: [
    MailingModule,
    CloudinaryModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Beneficiaries.name, schema: BeneficiariesSchema },
      { name: VerifyUserSignup.name, schema: VerifyUserSignupSchema }
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // EmailModule,
    // CloudinaryModule,
    JwtModule.register({
      secret: "secretkey",
      signOptions: { expiresIn: '12h' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService],
  exports: [AuthService, JwtStrategy, PassportModule],

})
export class AuthModule { }
