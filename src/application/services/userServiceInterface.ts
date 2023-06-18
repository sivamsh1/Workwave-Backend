import { UserServiceReturn } from "../../frameWorks/Services/userService"


 export  const userServiceInterface = (service:UserServiceReturn)=>{

const SendEmail =(WorkSpace:{email:string,name:string,token:string})=>{ return service.sendEmail(WorkSpace)  }


const generateToken = (workSpace:string)=>{ return service.generateToken(workSpace) }

const VerifyToken = ( token:string )=>{ return service.verifyToken(token) }
    
const encryptPassword = async (password:any)=>{ return await service.encryptPassword(password) }
 
        
    return{
     SendEmail,
     generateToken,
     VerifyToken,
     encryptPassword,
    }
}


export type UserServiceInterface = typeof  userServiceInterface;