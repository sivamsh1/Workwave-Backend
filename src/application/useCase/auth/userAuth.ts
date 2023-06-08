
import { UserDbInterface } from "../../repositories/userDbRepository"
import { AuthServiceInterface } from "../../services/authServiceInterface"




 export const userRegister =   async( 
    user:{ name:string,phone:number,email:string,password:any},
    userRepository : ReturnType< UserDbInterface>,
    authService: ReturnType< AuthServiceInterface >  
 )=>{
      
   let token = {
      accessToken:"",
      message:"",
      status:200
   };
    user.email = user.email.toLocaleLowerCase();
    const isEmailExist = await userRepository.getUserByEmail(user.email) 
    if(isEmailExist){
      token.message = "We are sorry this email already exist .Please try with different email to register !";
      token.status = 404        
    }else{
       user.password = await authService.encryptPassword(user.password);
       const { _id: userId } = await userRepository.addUser(user);
       const jwtToken = authService.generateToken(userId.toString());
       token.accessToken =jwtToken;
      }
       return token;
}


export const loginUser = async(
   user:{email:string,password:any},
   userRepository : ReturnType< UserDbInterface>,
   authService: ReturnType< AuthServiceInterface >
)=>{

   const tokenData = {
     status:404,
     message:"",
     accessToken:""

   }

   const existUser  = await userRepository.getUserByEmail(user.email);
   if(existUser){

      const hashedPassword = await authService.encryptPassword(user.password)
      const isPasswordCorrect = await authService.verifyPassword(existUser.password,hashedPassword)
         if(isPasswordCorrect){
              const jwtToken = authService.generateToken(existUser._id.toString());
              tokenData.accessToken = jwtToken;
            
         }else{
            tokenData.message = " Incorrect password please enter correct password ! ";
         } 
      
   }else{
     tokenData.message = " User not exist please check your credentials !";
   }

return tokenData;

}


export const EmployeeRegister = async (
   employee:{name:string,password:string },
   userRepository:ReturnType<UserDbInterface>,
   authService:ReturnType< AuthServiceInterface>
)=>{

   let token = {
      accesToken : "",
      message:" ",
      status:400,
   }

   employee.name = employee.name.toLocaleLowerCase();


}

