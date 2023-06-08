import bcrypt from 'bcryptjs';
import jwt  from 'jsonwebtoken';
import configKeys from '../../config';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
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

    const loginUrl = `https://localhost:5173/eRegister?token=${WorkSpace.token}`;

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
      console.log(data,"dataaaaaaaa")
    }
})

}



const generateToken = (payload:string)=>{

    const token = jwt.sign({payload},configKeys.JWT_SECRET,{
        expiresIn:"1h"
    })

    return token;

}


return{
sendEmail,
generateToken,

}

}



export type UserService = typeof userService;

export type UserServiceReturn = ReturnType<UserService>;