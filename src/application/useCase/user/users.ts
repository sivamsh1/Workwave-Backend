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

  isEmployeeExist = true;

  if (!isEmployeeExist) {
    addEmployeeData.message = "Employee already existing in this group";
  } else {
    const generateToken = await userService.generateToken(workSpace.email);

    const WorkSpace = {
      email: workSpace.email,
      name: workSpace.workSpace,
      token: generateToken,
    };

    const sendEmailToEmployee = await userService.SendEmail(WorkSpace);

    const addEmployeeToWorkspace = await userRepository.addEmployeeToWorkSpace(
      workSpace
    );

    addEmployeeData = {
      status: 200,
      message: "Employees added succesfuly",
    };
  }

  return addEmployeeData;
};



export  const getWorkSpaceDatas = async (userRepository: ReturnType<UserDbInterface>,)=>{
   
  const workSpaceDatas  = await userRepository.getWorkSpaceData();

  return workSpaceDatas;

}