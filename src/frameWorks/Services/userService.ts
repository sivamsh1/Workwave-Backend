import bcrypt from 'bcryptjs';
import jwt  from 'jsonwebtoken';
import configKeys from '../../config';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { token } from 'morgan';
dotenv.config();


export const userService  = ()=>{

//configuration    
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
    user:process.env.EMAIL,
    pass:process.env.PASSWORD,
    }
})
 
const sendEmail = (WorkSpace:{email:string,name:string,token:string})=>{

    const loginUrl = `http://localhost:5173/eRegister?token=${WorkSpace.token}&workSpaceName=${WorkSpace.name}`;

const mailOptions = {
    from: process.env.EMAIL,
    to: WorkSpace.email,
    subject: `Invitation to Join ${WorkSpace.name} in WorkWave Management`,
        html: `<p>Hi,</p>
    <br/>
    <p>I hope this email finds you well. I am reaching out to inform you that you have been added to the "${WorkSpace.name}" in WorkWave Management. I wanted to extend a formal invitation for you to join as well.</p>
    <br/>
    <p>To join the group, please click on the following link: <a href="${loginUrl}">${loginUrl}</a>. This will redirect you to the WorkWave Management platform, where you can sign in using your existing credentials or create a new account if you don't have one yet.</p>

    <p>Thank you for your attention, and we look forward to your presence in the "${WorkSpace.name}" group.</p>
    <br/>
    <p>Best regards,</p>
    <p>Team Workwave</p>`
}
    

transporter.sendMail(mailOptions,(err,data)=>{          
    if(err){                                
        console.log(err,"errorrrr")
    }else{
        console.log("Email Send succesfully");
    }
})

}



const generateToken = (payload:string)=>{

    const token = jwt.sign({payload},configKeys.JWT_SECRET,{
        expiresIn:"1h"
    })

    return token;

}

const verifyToken = (payload:string)=>{

    function verifytoken(token:string, secretKey:string) {
        try {
          const decoded = jwt.verify(token, secretKey);
          return decoded;
        } catch (error:any) {
          console.error('JWT verification error:', error.message);
          return null;
        }
      }

const decodeToken = verifytoken(payload,configKeys.JWT_SECRET)

if(decodeToken){
 return true;
}else{
    return false
}

}

const encryptPassword =async (password:any)=>{
    
    const salt = await bcrypt.genSalt(8);

    const hashedPassword = await bcrypt.hash(password,salt);
  
    return hashedPassword;
  }


return{
encryptPassword,
sendEmail,
generateToken,
verifyToken,

}

}



export type UserService = typeof userService;

export type UserServiceReturn = ReturnType<UserService>;