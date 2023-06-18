import User from "../Models/userModel";
import { UserInterface } from "../../../../types/userInterface";
import WorkSpaceModal from "../Models/workSpaceModel";
import PersonalTaskModel from "../Models/personalTaskModel";
import EmployeeModel from "../Models/employeeModel";


export const userRepositoryMongoDB = () => {
  const getUserByEmail = async (email: string) => {
    const user: UserInterface | null = await User.findOne({ email });
    return user;
  };

  const addUser = async (user: {
    name: string;
    phone: Number;
    email: string;
    password: string;
  }) => {
    return await User.create(user);
  };

  const isWorkSpaceExist = async (workSpace: string) => {
    const WorkSpace: string | null = await WorkSpaceModal.findOne({
      name: workSpace,
    });
    return WorkSpace;
  };

  const workSpaceCreate = async (workSpace: string) => {
    const WorkSpace = new WorkSpaceModal({
      name: workSpace,
      admin: "admin1",
      employees: [],
      isBlocked: false,
    });

    return WorkSpaceModal.create(WorkSpace);
  };

  const IsEmployeeExist = async (workSpace: {
    email: string;
    workSpace: string;
  }) => {
    return WorkSpaceModal.findOne({
      name: workSpace.workSpace,
      employees: { $in: [workSpace.email] },
    });
  };



  const getWorkSpaceDatas = () => {
    const workSpaces = WorkSpaceModal.find();
    return workSpaces;
  };

  const AddTaskstoWorkSpace = async (taskDetail: {
    taskName: string;
    taskDetails: string;
    workSpaceName: string;
    deadline: Date;
  }) => {
    const workSpace = await WorkSpaceModal.findOne({
      name: taskDetail.workSpaceName,
    });
    if (!workSpace) {
      return;
    } else {
      workSpace?.tasks.push(taskDetail);

      const workSpaceData = await workSpace.save();

      console.log(workSpaceData, "workSpaceDataaaa");

      return workSpaceData;
    }
  };

const AddPersonalTasks = (taskDatas:{ taskName:string,taskDetails:string,dealine:Date})=>{

   const taskDetails = {
    taskName:taskDatas.taskName,
    taskDetails:taskDatas.taskDetails,
    deadline:taskDatas.dealine,
    status:"todo"
   }

   const createPersonalTasks = PersonalTaskModel.create(taskDetails)

   return createPersonalTasks;

}

const GetPersonalTasks = ()=>{
  
  const personalTasks =  PersonalTaskModel.find()

  return personalTasks;

}

const getSingleWorkSpaceData = (workSpaceName:string)=>{

 const workSpaceDatas = WorkSpaceModal.findOne({name:workSpaceName}) 
 

 return workSpaceDatas;

}

const AddEmployeeData =async (employeeDetails:{ userName:string,password:string,token:string,workSpaceName:string })=>{

  const data = {
 
    name:employeeDetails.userName,
    passWord:employeeDetails.password,
    workSpaceName:employeeDetails.workSpaceName,
    status:true,
    task : []
  }

  const employeeCreation =  await EmployeeModel.create(data);
  console.log(employeeDetails.workSpaceName,"workSpacenameee")

  const addEmployeeToWorkSpace =  await WorkSpaceModal.findOneAndUpdate(
    {name:employeeDetails.workSpaceName},
    {$push:{employees:employeeDetails.userName}},
    {new:true}    ) 

 console.log(employeeCreation,"employeeCreation")
 console.log(addEmployeeToWorkSpace,"AddEmployeeToWorkSpace")
  return employeeCreation;
}



const isexistEmployee = async (name:string)=>{


 const employee = await EmployeeModel.findOne({name:name})
 
 return employee 

}



  return {
    isexistEmployee,
    addUser,
    getUserByEmail,
    isWorkSpaceExist,
    workSpaceCreate,
    IsEmployeeExist,
    getWorkSpaceDatas,
    AddTaskstoWorkSpace,
    AddPersonalTasks,
    GetPersonalTasks,
    getSingleWorkSpaceData,
    AddEmployeeData,
  };
};

export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
