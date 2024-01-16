export async function verifyEmailCode(email: string, code: string){
    const emailVerification = await prismadb.emailVerification.findUnique({
        where:{
            email: email,
        }
    });
    
    if(!emailVerification){
        throw new Error('Code doesnt exist');
    }

    const now = new Date(Date.now());
    
    if ((now.getTime()-emailVerification.updateAt.getTime()) > 86400000) {
        throw new Error('The code is outdated')
    }
    if(emailVerification.code==code){
        return true
    } else {
        return false
    } 
}