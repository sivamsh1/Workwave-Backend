import express , {Application , NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import configKeys from '../../config';



const expressConfig = (app:Application)=>{

 app.use(morgan('dev'));
 app.use(cors({ origin:configKeys.ORIGIN_PORT }));
 app.use(express.json());
 app.use(cookieParser());
 app.use(helmet({xssFilter:true}));
 app.use(mongoSanitize());
}

export default expressConfig ; 