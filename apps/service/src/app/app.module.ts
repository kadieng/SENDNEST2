import { DatabaseModule } from './../../../../libs/share/src/database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MailingModule } from './mailing/mailing.module';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [
    AuthModule,
    ConfigModule,
    MailingModule,
    UsersModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['_env/.env'],
    }),

  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
