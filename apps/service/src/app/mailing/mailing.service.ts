import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailingService {

  constructor(
    private readonly mailService: MailerService
  ) { }


  async sendEmail(payload: any) {
    await this.mailService.sendMail({
      to: payload.email,
      from: 'sendnest55@gmail.com',
      subject: 'welcome to sendnest',
      text: `${payload.message} ${payload.otp}`
    })

    console.log('success');
  }

}
