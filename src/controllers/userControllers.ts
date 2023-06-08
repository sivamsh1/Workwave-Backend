import { UserDbInterface } from "../application/repositories/userDbRepository"
import { UserRepositoryMongoDB } from "../frameWorks/Database/Mongodb/repositories/userRepositoryMongoDB"
import { UserService } from "../frameWorks/Services/userService"
import { UserServiceInterface } from "../application/services/userServiceInterface"
import { Request,Response } from "express";
import { createWorkSpace,addEmployee, getWorkSpaceDatas } from "../application/useCase/user/users";



export const  userControllers = (
userDbRepository:UserDbInterface,
userRepositoryMongoDB:UserRepositoryMongoDB,
userServiceImple:UserService,
userServiceInterface:UserServiceInterface,
)=>{

    const dbRepositoryUser = userDbRepository(userRepositoryMongoDB());
    const userService = userServiceInterface(userServiceImple());
 

     const addWorkspace = async(req:Request,res:Response)=>{

     const {workSpace}:{workSpace:string} = req.body;

     const workSpaceData = await createWorkSpace(workSpace,dbRepositoryUser,userService);
     
     console.log(workSpaceData,"dataaaaa");

     res.json({
       workSpaceData,
     })
       
    }
    

    const addEmployess = async(req:Request,res:Response)=>{
      
     const workSpaceData: {email:string,workSpace:string} = req.body ;

     const addEmployeesData = await addEmployee(workSpaceData,dbRepositoryUser,userService);      

    res.json({
    message:"Write something in body"
   })

    }

    const getWorkSpaces = async(req:Request,res:Response)=>{

    const  workSpaceDatas =  await getWorkSpaceDatas(dbRepositoryUser);
    

    res.json({
      workSpaceDatas,
    }) 
    }

    return{
      addWorkspace,
      addEmployess,
      getWorkSpaces,
    }
}