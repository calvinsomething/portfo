"use strict";
const nodemailer = require("nodemailer");
const winston = require('winston');

module.exports = async function (senderEmail, name, message) {
    const transporter = nodemailer.createTransport({
        host: "smtp.mailgun.org",
        port: 587,
        auth: {
          user: process.env.MG_EMAIL,
          pass: process.env.MG_PASSWORD,
        },
    });
    try {
        await transporter.sendMail({
            from: 'contactform@calvinsomething.com',
            to: "calvinsomething@gmail.com",
            subject: `Message From: ${name}`,
            text: `${senderEmail} says: ${message}`
        });
    } catch (err) {
        winston.error(err);
    }
};