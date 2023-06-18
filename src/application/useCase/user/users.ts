import { UserDbInterface } from "../../repositories/userDbRepository";
import { UserServiceInterface } from "../../services/userServiceInterface";

export const createWorkSpace = async (
  workSpace: string,
  userRepository: ReturnType<UserDbInterface>,
  userService: ReturnType<UserServiceInterface>
) => {
  workSpace = workSpace.toLocaleLowerCase();

  const isWorkSpaceExist = await userRepository.isWorkSpaceExist(workSpace);

  let workSpaceData = {
    status: 400,
    message: "",
  };

  if (isWorkSpaceExist !== null) {
    workSpaceData = {
      status: 400,
      message:
        " Another workspace exist with same name ,please try with different name ! ",
    };
  } else {
    const createWorkSpace = await userRepository.createWorkSpace(workSpace);

    workSpaceData = {
      status: 200,
      message: " New workSpace created  ",
    };
  }

  return workSpaceData;
};

export const addEmployee = async (
  workSpace: { email: string; workSpace: string },
  userRepository: ReturnType<UserDbInterface>,
  userService: ReturnType<UserServiceInterface>
) => {
  let addEmployeeData = {
    status: 400,
    message: "",
  };

  let isEmployeeExist = await userRepository.IsEmployeeExist(workSpace);
  console.log(isEmployeeExist,"isEmploeeeeee")



  if ( isEmployeeExist != null) {

    addEmployeeData.message = "Employee already existing in this group";
  } else {

    const generateToken = await userService.generateToken(workSpace.workSpace);


    
    const WorkSpace = {
      email: workSpace.email,
      name: workSpace.workSpace,
      token: generateToken,
    };
    
    const sendEmailToEmployee = await userService.SendEmail(WorkSpace);


    addEmployeeData = {
      status: 200,
      message: "Employees added succesfuly",
    };
  }

  return addEmployeeData;
};

export const getWorkSpaceDatas = async (
  userRepository: ReturnType<UserDbInterface>
) => {
  const workSpaceDatas = await userRepository.getWorkSpaceData();

  return workSpaceDatas;
};

export const getWorkSpace = async () => {};

export const addTasksToWorkSpace = async (
  userRepository: ReturnType<UserDbInterface>,
  taskDetail: {
    taskName: string;
    taskDetails: string;
    workSpaceName: string;
    deadline: Date;
  }
) => {
  let addTaskData = {
    status: 401,
  };
  const addTask = await userRepository.addTasksToworkSpace(taskDetail);

  console.log(addTask, "addTaskkk");

  if (addTask != null) {
    addTaskData.status = 200;
  } else {
    addTaskData.status = 401;
  }

  return addTaskData;
};



export const AddPersonalTasks = async (userRepository:ReturnType<UserDbInterface>,taskDatas:{taskName:string,taskDetails:string,deadline:Date})=>{


 const perosnalTaskDetails = {
  status:400
 } 

const addPersonalTasks  = await userRepository.addPersonaltasks(taskDatas);

if(addPersonalTasks){

  perosnalTaskDetails.status = 200;
}else{

  perosnalTaskDetails.status = 401
}

return perosnalTaskDetails;

}


export const GetPersonalTasks = async (userRepository:ReturnType<UserDbInterface>)=>{

  const getPersonalTasks = await userRepository.getpersonalTasks(); 

  return getPersonalTasks;

}


export const singleWorkSpacedata = async (userRepository:ReturnType<UserDbInterface>, workSpaceName:string)=>{

  const getSingleWorkSpaceData =  await userRepository.GetSingleWorkspaceData(workSpaceName)

   return getSingleWorkSpaceData;
}



export const CreateEmployee = async (employeeDetails:{  userName:string,password:any,token:string,workSpaceName:string },userRepository:ReturnType<UserDbInterface>,userService: ReturnType<UserServiceInterface> )=>{

  let data = {
    status:401,
    message:""
  };


const verifyToken = userService.VerifyToken(employeeDetails.token);

if(verifyToken){

  const isExistUser = await userRepository.isExistEmployee(employeeDetails.userName);
   
  if(isExistUser){    
    data.message = "Username already exist try with different name !"
  
  }else{
    
    const encryptPassword = await userService.encryptPassword(employeeDetails.password);
    
    employeeDetails.password = encryptPassword; 
    
    const addEmployeeData = await userRepository.addemployeeData(employeeDetails);
    
    
    data.message = "success"
    data.status = 200;
  }
}else{
     data.message = "Your link has expired try with new link....."
}

return data;

}