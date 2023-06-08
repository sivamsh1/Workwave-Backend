import { Application } from "express"
import { adminRouter } from "./admin";
import authRouter from "./auth";
import { userRouter } from "./user";



const routes = (app:Application)=>{
    
    app.use('/auth', authRouter())
    app.use('/user',userRouter());
    app.use('/admin',adminRouter());

}

export default routes;  