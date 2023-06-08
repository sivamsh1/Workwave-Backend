

 export const adminRepoInterface = (repository:any)=>{
    const getAdminByEmail = (email:string)=>{ return  repository.getAdminByEmail(email)}

    const getUserDatas = ()=>{ return  repository.getUserDatas() }

    const blockUser = (userId:string)=> {return repository.blockUser(userId) }

    const unBlockUser = (userId:string)=> {return repository.unBlockUser(userId) }

    return{
        getAdminByEmail,
        getUserDatas,
        blockUser,
        unBlockUser,
    }
}


export type AdminRepoInterface = typeof adminRepoInterface;