
 export  const userDbRepository =  (repository :any)=>{

    const addUser = async (user:{ name:string,phone:Number,email:string,password:string})=> await repository.addUser(user) ;     
    const getUserByEmail = async(email:string)=>await repository.getUserByEmail(email);
    const isWorkSpaceExist = async(workSpace:string)=>await repository.isWorkSpaceExist(workSpace);
    const createWorkSpace  =  async(workSpace:string)=> await repository.workSpaceCreate(workSpace);
    const IsEmployeeExist = async(workSpace:{email:string,workSpace:string })=> await repository.IsEmployeeExist(workSpace) 
    const addEmployeeToWorkSpace = async(workSpace:{email:string,workSpace:string })=> await repository.addEmployeeToWorkSpace(workSpace) 
    const isEmployeenameExist  = async(name:string)=>{ await repository.isEmployeenameExist(name) }
    const getWorkSpaceData =async () =>  await repository.getWorkSpaceDatas()
    const addTasksToworkSpace = async (taskDetail:{ taskName:string,taskDetails:string,workSpaceName:string,deadline:Date})=>  await repository.AddTaskstoWorkSpace(taskDetail) 
    const addPersonaltasks = async( taskDatas :{ taskName:string,taskDetails:string,deadline:Date} )=> await repository.AddPersonalTasks(taskDatas)    
    const getpersonalTasks = async ()=> await repository.GetPersonalTasks() 
    const GetSingleWorkspaceData = async (workSpaceName:string)=> await repository.getSingleWorkSpaceData(workSpaceName);
    const addemployeeData = async (employeeDetails:{ userName:string,password:string,token:string,workSpaceName:string })=>{ return await  repository.AddEmployeeData(employeeDetails)  }
    const isExistEmployee = async (name:string)=>{  return await repository.isexistEmployee(name) }
    return{
        isExistEmployee,
        addUser,
        getUserByEmail,
        isWorkSpaceExist,
        createWorkSpace,
        IsEmployeeExist,
        addEmployeeToWorkSpace,
        isEmployeenameExist,
        getWorkSpaceData,
        addTasksToworkSpace,
        addPersonaltasks,
        getpersonalTasks,
        GetSingleWorkspaceData,
        addemployeeData,
    }

}

export type UserDbInterface = typeof userDbRepository;


