import bcrypt from 'bcrypt' 
import {NextApiRequest, NextApiResponse} from 'next'
import prismadb from '../../../lib/prismadb'
import crypto from 'crypto'
import { sendMail } from '../../../lib/nodemailer';

function generateCode() {
    let buf = new Uint8Array(6);
    crypto.getRandomValues(buf);
    const str = `${buf[0]}${buf[1]}${buf[2]}${buf[3]}${buf[4]}${buf[5]}`
    return str.substring(0,6)
}

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method!=='POST'){
        return res.status(405).end();
    }

    try {
        const {email} = req.body;
        if(!email.includes('@')){
            return res.status(400).json({error:'Invalid email'});
        }
        const existingUser = await prismadb.user.findUnique({
            where:{
                email: email
            }
        })

        if(existingUser){
            return res.status(422).json({error:'Email taken'});
        }

        const existingVerificationEmail = await prismadb.emailVerification.findUnique({
            where:{
                email: email
            }
        })

        const code = generateCode();

        if(existingVerificationEmail){
            const updateVerificationCode = await prismadb.emailVerification.update({
                where: {
                    email: email,
                },
                data: {
                    code: code
                },
            })
            
        } else{
            const createdDataInEmailVerification = await prismadb.emailVerification.create({
                data:{
                    email,
                    code
                }
            })
        }

        // const hashedPassword = await bcrypt.hash(password,12);

        const sendedMail = await sendMail(
            email, 
            'Verification Code',
            `Your code: ${code}`,
            `<span>Your code: <b>${code}</b> </span>`
        )

        return res.status(200).json("code was sended")
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}