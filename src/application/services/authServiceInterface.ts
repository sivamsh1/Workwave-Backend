import { AuthServiceReturn } from "../../frameWorks/Services/authService";

export const authServiceInterface = (services:AuthServiceReturn)=>{

    const encryptPassword = (password:string)=>{ return services.encryptPassword(password) }
    
    const generateToken = (payload:string)=> { return  services.generateToken(payload)}

    const verifyPassword = (password:string,hashedPassword:string)=>{ return services.verifyPassword(password,hashedPassword) }

return {
    encryptPassword,
    generateToken,
    verifyPassword,
}

}

export type AuthServiceInterface = typeof authServiceInterface;

 