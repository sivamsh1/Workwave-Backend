import express from 'express';
import { adminRepoInterface } from '../../../application/repositories/adminRepoInterface';
import { adminServiceInterface } from '../../../application/services/adminServiceInterface';
import { adminControllers } from '../../../controllers/adminController';
import { adminRepositoryMongoDB } from '../../Database/Mongodb/repositories/adminRepositoryMongodb';
import { adminService } from '../../Services/adminService';


export const adminRouter = ()=>{

  const router = express.Router();  

  const controller = adminControllers(
adminRepoInterface,
adminRepositoryMongoDB,
adminService,
adminServiceInterface,
)

router.post('/user-datas', controller.collectDatasOfUsers )
router.post('/block-user', controller.blockUser )
router.post('/unblock-user', controller.unBlockUser )

  return router;
 

}