import mongoose,{Schema,model} from "mongoose";


const taskScema = new mongoose.Schema({
    taskName:String,
    taskDetails:String,
    workSpaceName:String,
    deadline:Date,
  })


const employeeScema = new Schema(
    {
        name:String,
        passWord:String,
        workSpaceName:String,
        status:Boolean,
        task : [taskScema],
    },
);


const EmployeeModel = model("Employee",employeeScema,"employee");

export default EmployeeModel;



