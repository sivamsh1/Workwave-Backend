import { Request, response, Response } from "express";
import { UserRepositoryMongoDB } from "../frameWorks/Database/Mongodb/repositories/userRepositoryMongoDB";
import { AuthService } from "../frameWorks/Services/authService";
import { AuthServiceInterface } from "../application/services/authServiceInterface";
import { UserDbInterface } from "../application/repositories/userDbRepository";
import { EmployeeRegister, loginUser, userRegister } from "../application/useCase/auth/userAuth";
import asyncHandler from 'express-async-handler'
import { loginAdmin } from "../application/useCase/auth/adminAuth";
import { AdminRepositoryMongoDB } from "../frameWorks/Database/Mongodb/repositories/adminRepositoryMongodb";
import { AdminRepoInterface } from "../application/repositories/adminRepoInterface";

export const authController = (
  userDbRepository: UserDbInterface,
  userRepositoryMongoDB: UserRepositoryMongoDB,
  authServiceImpl: AuthService,
  authServiceInterface: AuthServiceInterface,
  adminRepository:AdminRepositoryMongoDB,
  adminRepoInterface:AdminRepoInterface,
) => {
  const dbRepositoryUser = userDbRepository(userRepositoryMongoDB());
  const authService = authServiceInterface(authServiceImpl());
  const dbRepositoryAdmin = adminRepoInterface(adminRepository())


  const registerUser = asyncHandler( async (req: Request, res: Response) => {
    const user: {
      name: string;
      phone: number;
      email: string;
      password: string;
    } = req.body;
    const tokenData = await userRegister(user, dbRepositoryUser, authService);
    console.log(tokenData, "Tokennn");

    res.json({
      message: "success",
      tokenData,
    });
  })


  
  const employeeRegister  = async(req:Request,res:Response)=>{
   
  const employee :{name:string,password:string} = req.body;

  const tokenData = await EmployeeRegister(employee,dbRepositoryUser,authService)
  res.json({
    tokenData,
  })
      
  }


  const userLogin  = async(req:Request ,res:Response)=>{

  const user:{ email:string, password:string }   = req.body;
  
  const tokenData = await loginUser(user,dbRepositoryUser,authService);
  
  console.log(tokenData,"tokenDatataaa")
    
  res.json({
    tokenData

  })
        
  }

  const adminLogin  = async(req:Request ,res:Response)=>{

    const admin:{ email:string, password:string }   = req.body;
    
    const tokenData = await loginAdmin(admin,dbRepositoryAdmin,authService);
    
    console.log(tokenData,"tokenDatataaa")
      
    res.json({
      tokenData
  
    })
          
    }


  return {
    registerUser,
    userLogin,
    adminLogin,
    employeeRegister,
  };
}
