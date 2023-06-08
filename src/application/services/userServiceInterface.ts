import { UserServiceReturn } from "../../frameWorks/Services/userService"


 export  const userServiceInterface = (service:UserServiceReturn)=>{

const SendEmail =(WorkSpace:{email:string,name:string,token:string})=>{ return service.sendEmail(WorkSpace)  }


const generateToken = (email:string)=>{ return service.generateToken(email) }
    
 
        
    return{
     SendEmail,
     generateToken,

    }
}


export type UserServiceInterface = typeof  userServiceInterface;