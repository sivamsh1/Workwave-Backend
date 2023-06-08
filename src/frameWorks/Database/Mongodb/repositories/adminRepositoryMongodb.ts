import adminModal from "../Models/adminModal"
import UserModel from "../Models/userModel"


 export const adminRepositoryMongoDB = ()=>{

const getAdminByEmail = async(email:string)=>{
    const admin : any = await adminModal.findOne({email})
    return admin;
}

const getUserDatas = async()=>{
    const users = UserModel.find();
    return users;
}


const blockUser = async(userId:string)=>{
const blocked =await UserModel.findByIdAndUpdate(userId,{ isBlocked:true},{new:true})

if(blocked){
 const isBlocked = true;
 return isBlocked;
}else;
const isBlocked =false;
return isBlocked;

}


const unBlockUser = async(userId:string)=>{
    const unBlocked =await UserModel.findByIdAndUpdate(userId,{ isBlocked:false},{new:true})
    
    if(unBlocked){
     const isUnBlocked = true;
     return isUnBlocked;
    }else;
    const isUnBlocked =false;
    return isUnBlocked;
    
    }

return {
    getAdminByEmail, 
    getUserDatas,
    blockUser,
    unBlockUser,
}
}
export type AdminRepositoryMongoDB = typeof adminRepositoryMongoDB;  