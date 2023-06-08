import mongoose from "mongoose";

export interface UserInterface {
    _id: string;
    firstName:string;
    lastName:string;
    email: string;
    password: string;
    isGoogleUser:boolean
}



