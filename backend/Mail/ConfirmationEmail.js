import nodemailer from "nodemailer";
 const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 465,
   secure: false, // true for 465, false for other ports
   auth: {
     user: 'harshkumar808348@gmail.com', // generated ethereal user
     pass: '', // generated ethereal password
   },
 })

 function sendMail(to , sub , msg ){
    transporter.sendMail({
      from: 'harshkumar808348@gmail.com', // sender address
      to: to, // list of receivers
      subject: sub, // Subject line
      text: msg, // plain text body
    });
 }

