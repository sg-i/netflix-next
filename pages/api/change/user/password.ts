import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt' 
import serverAuth from "../../../../lib/serverAuth";
import {compare} from "bcrypt"
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    try {
        if(req.method==='PUT'){
            const {currentUser} = await serverAuth(req, res);
            const {email, oldPassword, newPassword} = req.body;
            const existingUser = await prismadb.user.findUnique({
                where:{
                    email: email
                }
            })

            if(!existingUser  ){
                console.log('email wrong')
                return res.status(422).json({error:'Email doesnt exist'});
            }
            if(!existingUser.hashedPassword){
                console.log('you was registered with OAuth')
                return res.status(422).json({error:'you was registered with OAuth'});
            }
           
            // const hashedOldPassword = await bcrypt.hash(oldPassword,12);

            const isCorrectPassword = await compare(
                oldPassword, 
                existingUser.hashedPassword
            );
            console.log(isCorrectPassword)
            if(!isCorrectPassword){
                console.log('wrong pass')
                return res.status(422).json({error: 'Wrong old password'});
            }

            const hashedNewPassword = await bcrypt.hash(newPassword,12);

            const updateUser = await prismadb.user.update({
                where: {
                    email: email,
                },
                data: {
                    hashedPassword: hashedNewPassword
                },
            })
            console.log("it's okay")
            
            return res.status(200).json({'message': 'done'});
        }
        return res.status(405).end();
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}