const { MailtrapClient } = require("mailtrap");

// For this example to work, you need to set up a sending domain,
// and obtain a token that is authorized to send from the domain
const TOKEN = "d9b3eb71a63b5ac19923c6ea7cd75beb";
const SENDER_EMAIL = "kevinkaslong@gmail.com";
const RECIPIENT_EMAIL = "hackboy015@gmail.com";

const client = new MailtrapClient({ token: TOKEN });

const sender = { name: "Mailtrap Test", email: SENDER_EMAIL };

client
  .send({
    from: sender,
    to: [{ email: RECIPIENT_EMAIL }],
    subject: "Hello from Mailtrap!",
    text: "Welcome to Mailtrap Sending!",
  })
  .then(console.log, console.error);