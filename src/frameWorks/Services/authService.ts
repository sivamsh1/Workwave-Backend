import bcrypt from 'bcryptjs';
import jwt  from 'jsonwebtoken';
import configKeys from '../../config';


export const authService = ()=>{

const encryptPassword = async (password:string)=>{
const salt = await bcrypt.genSalt(8);
const hashedPassword =  await bcrypt.hash( password,salt);
return hashedPassword;
}

const generateToken=(payload:string)=>{
    const token = jwt.sign({payload}, configKeys.JWT_SECRET, {
        expiresIn: "5d",
    });
    return token
}

const  verifyPassword = (password:string,hashedPassword:string)=>{
    return bcrypt.compare(password,hashedPassword);
}


return{
encryptPassword,
generateToken ,
verifyPassword,

}

}

export type AuthService = typeof authService; 

export type AuthServiceReturn = ReturnType<AuthService>