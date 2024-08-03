import bcrypt from 'bcrypt' 
import {NextApiRequest, NextApiResponse} from 'next'
import prismadb from '../../lib/prismadb'
import { verifyEmailCode } from '../../lib/verify-email-code';

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method!=='POST'){
        return res.status(405).end();
    }

    try {
        const {email, name, password, code} = req.body;

        const existingUser = await prismadb.user.findUnique({
            where:{
                email: email
            }
        })

        if(existingUser){
            return res.status(422).json({error:'Email taken'});
        }

        const hashedPassword = await bcrypt.hash(password,12);

        const isCodeVerified = await verifyEmailCode(email, code)

        if(!isCodeVerified){
            return res.status(422).json({error: "code is invalid"})
        }

        const user= await prismadb.user.create({
            data:{
                email,
                name,
                hashedPassword,
                image:  '',
                emailVerified: new Date(),
            }
        })

        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(400).end()
    }
}