import  User from '../Models/userModel'
import { UserInterface } from '../../../../types/userInterface'
import WorkSpaceModal from '../Models/workSpaceModel';


export const userRepositoryMongoDB = () => {

const getUserByEmail = async(email:string)=>{
const user: UserInterface | null =  await User.findOne({email});
return user;
};

const addUser = async(user:{name:string ; phone:Number;email:string;password:string} )=>{
    return await User.create(user);
}; 

const isWorkSpaceExist = async( workSpace:string )=>{
  const WorkSpace : string | null = await WorkSpaceModal.findOne({name:workSpace})
  return WorkSpace;  
}

const workSpaceCreate = async(workSpace:string)=>{
 const  WorkSpace = new WorkSpaceModal({
    name:workSpace,    
    admin:"admin1",
    employees :[],
    isBlocked:false
 })

 return WorkSpaceModal.create(WorkSpace);
}


const IsEmployeeExist = async(workSpace:{ email:string,workSpace:string})=>{
 return WorkSpaceModal.findOne({
    name:workSpace.workSpace,
    employees:{ $in:[workSpace.email]}
  })

}

const addEmployeeToWorkSpace = async (workSpace:{email:string,workSpace:string})=>{

return WorkSpaceModal.findByIdAndUpdate(
  {name:workSpace.workSpace},
  {$push:{ employees:workSpace.email}},
  {new:true}
)    
}

const getWorkSpaceDatas = ()=>{
const workSpaces = WorkSpaceModal.find();
return workSpaces;
}




return {
    addUser,
    getUserByEmail,
    isWorkSpaceExist,
    workSpaceCreate,
    IsEmployeeExist,
    addEmployeeToWorkSpace,
    getWorkSpaceDatas,
};

}


export type UserRepositoryMongoDB = typeof userRepositoryMongoDB;
