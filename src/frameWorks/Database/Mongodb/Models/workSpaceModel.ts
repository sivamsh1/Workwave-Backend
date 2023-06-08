import mongoose from "mongoose";

const workSpaceSchema = new mongoose.Schema({
  name: String,
  admin: String,
  employees: [{
    type: mongoose.Schema.Types.String,
  }],
});

const WorkSpaceModal = mongoose.model("WorkSpace", workSpaceSchema, "workSpace");

export default WorkSpaceModal;




