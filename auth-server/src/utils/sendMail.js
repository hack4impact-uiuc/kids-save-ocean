const nodemailer = require("nodemailer");
async function sendMail(mail_body) {
  let auth = {
    user: process.env.INFRA_EMAIL,
    pass: 'kso2020!'
  }
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth
  });
  await transporter.sendMail(mail_body);
}

async function sendPasswordChangeEmail(email) {
  const mail_body = {
    from: "kso.auth.server@gmail.com",
    to: email,
    subject: "Password Change Confirmation",
    text:
      "Hi, this is a confirmation to say that your password has just been changed or reset. If you did not make this change, please reply to this email."
  };
  await sendMail(mail_body);
}

module.exports = { sendMail, sendPasswordChangeEmail };
