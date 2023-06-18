import express from "express";
import { authController } from '../../../controllers/authControllers';
import { userDbRepository } from '../../../application/repositories/userDbRepository';
import { authServiceInterface } from '../../../application/services/authServiceInterface';
import { userRepositoryMongoDB } from '../../Database/Mongodb/repositories/userRepositoryMongoDB';
import { authService } from '../../Services/authService';
import { adminRepoInterface } from "../../../application/repositories/adminRepoInterface";
import { adminRepositoryMongoDB } from "../../Database/Mongodb/repositories/adminRepositoryMongodb";

const authRouter = ()=>{

    const router = express.Router();  

    const controller = authController( 
        userDbRepository,
        userRepositoryMongoDB,
        authService,
        authServiceInterface,
        adminRepositoryMongoDB,
        adminRepoInterface,

    );


    router.post('/user-register',controller.registerUser);
    router.post('/user-login',controller.userLogin);
    router.post('/admin-login',controller.adminLogin);
    router.get('/employee-register',controller.employeeRegister);
         

    return router;

}


export default authRouter;