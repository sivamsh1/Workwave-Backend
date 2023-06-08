
 export  const userDbRepository =  (repository :any)=>{

    const addUser = async (user:{ name:string,phone:Number,email:string,password:string})=> await repository.addUser(user) ;     
    const getUserByEmail = async(email:string)=>await repository.getUserByEmail(email);
    const isWorkSpaceExist = async(workSpace:string)=>await repository.isWorkSpaceExist(workSpace);
    const createWorkSpace  =  async(workSpace:string)=> await repository.workSpaceCreate(workSpace);
    const IsEmployeeExist = async(workSpace:{email:string,workSpace:string })=> await repository.IsEmployeeExist(workSpace) 
    const addEmployeeToWorkSpace = async(workSpace:{email:string,workSpace:string })=> await repository.addEmployeeToWorkSpace(workSpace) 
    const isEmployeenameExist  = async(name:string)=>{ await repository.isEmployeenameExist(name) }
    const getWorkSpaceData =async () =>  await repository.getWorkSpaceDatas()
        
    
    
    return{
        addUser,
        getUserByEmail,
        isWorkSpaceExist,
        createWorkSpace,
        IsEmployeeExist,
        addEmployeeToWorkSpace,
        isEmployeenameExist,
        getWorkSpaceData
    }

}

export type UserDbInterface = typeof userDbRepository;


