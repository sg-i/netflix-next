import {NextApiRequest, NextApiResponse} from 'next'
import { env } from "process";
import { sendMail } from '../../lib/nodemailer';
import { resolveSoa } from 'dns';

const nodemailer = require('nodemailer');

export default function handler(req:NextApiRequest, res:NextApiResponse) {
  const to = "sgadov2vanya@yandex.ru";
  const subject = "Test message"
  const text = "Just text"
  const html = "<span>Some Text<b>Big Text</b>Some Text</span>"
  if (req.method === 'POST') {
    sendMail(to, subject, text, html)
      .then((info)=>{
        console.log(info);
        res.status(200).json('lol')

      })
      .catch((error)=>{
        console.log(error);
        res.status(400).json(error)
      });
    
  } else{
    res.status(405).end();
  }
  
}