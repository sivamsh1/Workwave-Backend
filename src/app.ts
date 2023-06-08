import express ,{application, Application, NextFunction} from 'express';
import http from 'http'
import connectDB from './frameWorks/Database/Mongodb/connection';
import expressConfig from './frameWorks/Webserver/express';
import routes from './frameWorks/Webserver/routes';
import serverConfig from './frameWorks/Webserver/server';
import cors from 'cors'
import configKeys from './config';
import errorHandlingMidlleware from './frameWorks/Webserver/middlewares/errorHandlingMiddleware';
import AppError from './utils/appError';


// Creating app and server
const app = express();
const server = http.createServer(app);

// Enable CORS for specific origin
app.use(cors({
    origin: configKeys.ORIGIN_PORT,
  }));

// Express configuration 
expressConfig(app);

// Connecting Database
connectDB();

// Routes For each end point
routes(app); 


app.use(errorHandlingMidlleware)

// catch 404 and forward to error handler
app.all('*', (req,res,next:NextFunction) => {
  next(new AppError('Not found', 404));
});


//Server config and start
serverConfig(server).startServer();












