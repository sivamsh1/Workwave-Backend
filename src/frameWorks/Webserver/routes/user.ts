import express  from "express"
import { userDbRepository } from "../../../application/repositories/userDbRepository";
import { userControllers } from "../../../controllers/userControllers";
import { userRepositoryMongoDB } from "../../Database/Mongodb/repositories/userRepositoryMongoDB";
import { userService } from "../../Services/userService";
import { userServiceInterface } from "../../../application/services/userServiceInterface";  



export  const userRouter =()=>{


    const controller = userControllers(
      userDbRepository,
      userRepositoryMongoDB,
      userService,
      userServiceInterface,
    )
    
     const router = express.Router();


     router.post('/create-workspace',controller.addWorkspace)
     router.post('/add-employee',controller.addEmployess)
     router.post('/get-workSpaces',controller.getWorkSpaces)
 

     return router;
}