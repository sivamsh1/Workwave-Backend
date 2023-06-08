import mongoose,{Schema,model} from "mongoose";


const userScema = new Schema(
    {
        name:{
            type:String
        },
        phone:{
            type:Number
        },
        email:{
            type:String 
        },
        password:{
            type:String
        },
        isBlocked:{
            type:Boolean
        }
    },
);


const UserModel = model("User",userScema,"users");

export default UserModel;