import nodemailer from 'nodemailer'
import { env } from 'process';

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: env.EMAIL_HOST_USER,
    pass: env.EMAIL_HOST_PASSWORD,
  },
});
export async function sendMail(
  to: string, 
  subject: string, 
  text: string, 
  html: string) {
  const info = await transporter.sendMail({
      from: env.EMAIL_HOST_USER, 
      to, 
      subject, 
      text,
      html,
  });
  return info
}
  
  