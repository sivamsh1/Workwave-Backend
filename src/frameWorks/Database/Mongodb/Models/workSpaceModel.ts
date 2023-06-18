import mongoose from "mongoose";

const taskScema = new mongoose.Schema({
  taskName:String,
  taskDetails:String,
  workSpaceName:String,
  deadline:Date,
})

const workSpaceSchema = new mongoose.Schema({
  name: String,
  admin: String,
  employees: [{
    type: mongoose.Schema.Types.String,
  }],
  tasks:[taskScema]
});

const WorkSpaceModal = mongoose.model("WorkSpace", workSpaceSchema, "workSpace");

export default WorkSpaceModal;




