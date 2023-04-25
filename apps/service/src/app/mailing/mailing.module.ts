import { Module } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { MailingController } from './mailing.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'sendnest55@gmail.com',
          pass: 'pzglomythctudckr',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      // template: {
      //   dir: path,
      //   adapter: new EjsAdapter(), // or new PugAdapter() or new EjsAdapter()
      //   options: {
      //     strict: true,
      //   },
      // },
    }),
  ],
  controllers: [MailingController],
  providers: [MailingService],
  exports: [MailingService]
})
export class MailingModule { }
