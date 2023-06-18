import { UserDbInterface } from "../application/repositories/userDbRepository"
import { UserRepositoryMongoDB } from "../frameWorks/Database/Mongodb/repositories/userRepositoryMongoDB"
import { UserService } from "../frameWorks/Services/userService"
import { UserServiceInterface } from "../application/services/userServiceInterface"
import { Request,Response } from "express";
import { createWorkSpace,addEmployee, getWorkSpaceDatas, addTasksToWorkSpace, AddPersonalTasks, GetPersonalTasks, singleWorkSpacedata, CreateEmployee } from "../application/useCase/user/users";
import { userRegister } from "../application/useCase/auth/userAuth";


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
     

     res.json({
       workSpaceData,
     })
       
    }
    

    const addEmployess = async(req:Request,res:Response)=>{
      
     const workSpaceData: {email:string,workSpace:string} = req.body ;


     const addEmployeesData = await addEmployee(workSpaceData,dbRepositoryUser,userService); 
     
     res.json({
      addEmployeesData
     })


    }

    const getWorkSpaces = async(req:Request,res:Response)=>{

    const  workSpaceDatas =  await getWorkSpaceDatas(dbRepositoryUser);
    

    res.json({
      workSpaceDatas,
    }) 
    }

    
    
    const addTasks = async (req:Request,res:Response )=>{
      
      const taskDetails : { taskName:string,taskDetails: string,workSpaceName:string,deadline:Date}  = req.body;
      
        const addTask = await  addTasksToWorkSpace(dbRepositoryUser,taskDetails);
        

        res.json({addTask});

    }


    const addPersonalTasks = async(req:Request,res:Response)=>{
    
      const taskDatas:{ taskName:string,taskDetails:string,deadline:Date } = req.body;

      const addPersonalTasks = await AddPersonalTasks(dbRepositoryUser,taskDatas)


      res.json({addPersonalTasks})
      
    }
    
    const getPersonalTasks =async(req:Request,res:Response)=>{
      
      const getPersonalDatas =  await GetPersonalTasks(dbRepositoryUser);
      
      res.json({ 
          tasks:getPersonalDatas     
      })

    }     
         
    
        const getWorkSpace = async (req:Request,res:Response)=>{

          const workSpaceName:string  = req.body.name;
              
          const singleWorkSpaceData =  await singleWorkSpacedata(dbRepositoryUser,workSpaceName);

           res.json({
            workSpaceData : singleWorkSpaceData
           })

        }

   const createEmployee = async(req:Request,res:Response)=>{
    
      const employeeDetails : { userName:string,password:string,token:string,workSpaceName:string }  = req.body ;

      const createEmployee = await CreateEmployee(employeeDetails,dbRepositoryUser,userService)

      res.json({
        user:createEmployee
      })
       
   }
    return{
      addWorkspace,
      addEmployess,
      getWorkSpaces,
      getWorkSpace,
      addTasks,
      addPersonalTasks,
      getPersonalTasks,
      createEmployee,
    }
}