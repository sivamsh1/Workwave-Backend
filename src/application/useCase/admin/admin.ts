import { AdminRepoInterface } from "../../repositories/adminRepoInterface"


export const userDatas = (adminRepository:ReturnType< AdminRepoInterface>)=>{

const getUserDatas = adminRepository.getUserDatas();

return getUserDatas;

}


export const userBlock = (user:{userId:string} , adminRepository:ReturnType<AdminRepoInterface>)=>{

   const BlockUser = adminRepository.blockUser(user.userId) 

   return BlockUser;
}

export const userUnBlock = (user:{userId:string} , adminRepository:ReturnType<AdminRepoInterface>)=>{

   const unBlockUser = adminRepository.unBlockUser(user.userId) 

   return unBlockUser;
}