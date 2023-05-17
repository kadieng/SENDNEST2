import { Module } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { MailingController } from './mailing.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        // host:'live.smtp.mailtrap.io',
        port: 465,
        // port: 587 ,
        secure: true,
        // secure: false,
        auth: {
          user: 'sendnest55@gmail.com',
          pass: 'eqjbuolzcpjdebkd',
          // user: "api",
          // pass:"b73a4119145a17cfabe24a73dff64707"
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
