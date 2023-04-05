// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey('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')


// export async function sendEmail(payload: any) {
//   console.log(payload.email)
//   const mail = {
//     to: payload.email,
//     subject: 'Hello from sendgrid',
//     from: 'sendnest55@gmail.com', // Fill it with your validated email on SendGrid account
//     text: 'Hello',
//     html: `<h1>Hello</h1>${payload.otp}`,
//   };

//   const result = await sgMail.send(mail)
//     .then(console.log('Email sent'))
//     .catch((error: any) => console.log(error))
//   //   if (result) {
//   //     console.log('message send')
//   //   }
//   // } catch (error) {
//   //   console.log(error)
//   // }


// }