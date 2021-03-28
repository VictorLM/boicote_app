const nodemailer = require('nodemailer');
require('dotenv').config();

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(mail) {
  /*
  const mail = {
    from: `"Boicote.App" <${process.env.MAIL_USERNAME}>`, // sender address
    to: '', // list of receivers
    subject: '', // Subject line
    text: '', // plain text body
    html: '<b>Hello world?</b>', // html body
  };
  */
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SMTP_ADDRESS,
    port: process.env.MAIL_SMTP_PORT,
    secure: false,
    tls: {
      ciphers: 'SSLv3',
    },
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  try {
    // send mail with defined transport object
    const info = await transporter.sendMail(mail);

    console.log('Message sent: %s', info.messageId);
  } catch (e) {
    console.log(e);
  }
}

module.exports.sendMail = sendMail;
