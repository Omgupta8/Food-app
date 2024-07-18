const { rest } = require("lodash");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "om.1000.gupta@gmail.email",
    pass: "wuta pkxp qbgm jyvl",
  },
});

// async..await is not allowed in global scope, must use a wrapper
module.exports.sendMail = async function main(str, data) {
  try {
    console.log(str,data);
    var Osubject, Otext, Ohtml;
    if (str == "signup") {

      Osubject = `Thank you for signing ${data.name}`;
      Ohtml = `
        <h1>Welcome to foodApp.com </h1>
        Hope you have a good time Here are your details-
        Name- ${data.name}
        Email- ${data.email}
        `; 
    } else if (str == "resetpassword") {
      Osubject = "Reset Password";
      Ohtml = `
        <h1> foodApp.com </h1>
        Here is your Link to reset you password!
        ${data.resetPasswordLink}
        `;
    }
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"FoodApp.com 🍇" <om.1000.gupta@gmail.email>', // sender address
      to: data.email, // list of receivers
      subject: Osubject, // Subject line
      // text: "Hello world?", // plain text body
      html: Ohtml, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  } catch (err) {
    return err;
  }
};