import { token } from "morgan";
import { AuthServiceInterface } from "../../services/authServiceInterface";
import { AdminRepoInterface } from "../../repositories/adminRepoInterface";


export const loginAdmin = async(
    admin:{email:string,password:string},
    adminRepository:ReturnType<AdminRepoInterface>,
    authService:ReturnType<AuthServiceInterface>
    )=>{

const tokenData = {
    status:400,
    message:""
}

const existAdmin = await adminRepository.getAdminByEmail(admin.email);

console.log(existAdmin,"existAdmin is working succesfully");

if(existAdmin){
    if(existAdmin.password === admin.password){
         tokenData.status = 200;
         tokenData.message = "success"
    }else{
        tokenData.message =" Incorrect password ! please try again.. "
    }
}else{
tokenData.message = " Invalid Credentials ! please try again..  "

}

return{
    tokenData,
}
         
}