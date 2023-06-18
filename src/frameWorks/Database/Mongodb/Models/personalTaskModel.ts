import mongoose,{Schema,model} from "mongoose";


const personalTaskScema = new Schema(
    {
       taskName:String,
       taskDetails:String,
       deadline:Date,
       status:String

    },
);


const PersonalTaskModel = model("Personaltask",personalTaskScema ,"personaltask");

export default PersonalTaskModel;