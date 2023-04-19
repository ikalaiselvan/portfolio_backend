// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";

const sendEmail = async (email, subject, payload) => {
  console.log("Sending email....");
  // console.log("Email password : ",process.env.EMAIL_PASSWORD)
  try {
    var transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "inskalai@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    var mailOptions = {
      from: "inskalai@gmail.com",
      to: "inskalai@gmail.com",
      subject: subject,
      text: JSON.stringify(payload),
    };
    await transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log("Error while sending mail: ", err);
        return false;
      }
      console.log("Success.");
      return true;
    });
  } catch (error) {
    console.log("Error: Send Mail: ", error);
    return false;
  }
};

export default sendEmail;