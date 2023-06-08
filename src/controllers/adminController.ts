import { AdminRepoInterface } from "../application/repositories/adminRepoInterface";
import { AdminServiceInterface } from "../application/services/adminServiceInterface";
import { AdminRepositoryMongoDB } from "../frameWorks/Database/Mongodb/repositories/adminRepositoryMongodb";
import { AdminService } from "../frameWorks/Services/adminService";
import { Request, Response } from "express";
import {
  userBlock,
  userDatas,
  userUnBlock,
} from "../application/useCase/admin/admin";

export const adminControllers = (
  adminDbRepository: AdminRepoInterface,
  adminRepositoryMongoDB: AdminRepositoryMongoDB,
  adminServiceImple: AdminService,
  adminRepoInterface: AdminServiceInterface
) => {
  const dbRepositoryAdmin = adminDbRepository(adminRepositoryMongoDB());

  const adminService = adminRepoInterface(adminServiceImple());

  const collectDatasOfUsers = async (req: Request, res: Response) => {
    const usersDetails = await userDatas(dbRepositoryAdmin);

    console.log(usersDetails, "userDetailssss");

    res.json({
      usersDetails,
    });
  };

  const blockUser = async (req: Request, res: Response) => {
    const user = req.body;

    const UserBlock = await userBlock(user, dbRepositoryAdmin);

    res.json({
      isBlocked: UserBlock,
    });
  };

  const unBlockUser = async (req: Request, res: Response) => {
    const user = req.body;

    const UserUnBlock = await userUnBlock(user, dbRepositoryAdmin);

    res.json({
      isUnBlocked: UserUnBlock,
    });
  };

  return {
    collectDatasOfUsers,
    blockUser,
    unBlockUser,
  };
};
