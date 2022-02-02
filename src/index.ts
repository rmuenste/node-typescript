import express from 'express';
import dotenv from "dotenv";
import connect from './connect';
import TInput from './connect';
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
import { requireAuth2 } from './middleware/authMiddleware';

dotenv.config({path: __dirname + '/../.env'}); 
//=========================================================================================
//                                 Set up express
//=========================================================================================
const app = express();
const cors = require('cors');

// const PORT: number = (process.env.PORT as number) || 5001;
const port = process.env.PORT ?? 5001;
const mongoUri: string = process.env.LOCAL_MONGO_URI as string;
let corsOptions = {
 "origin": "http://localhost:4200",
 "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
 "credentials": true,
  "preflightContinue": false,
  "optionsSuccessStatus": 204
};

app.use(cors(corsOptions));

//=========================================================================================
//                                 Set up middleware
//=========================================================================================
function loggerMiddleware(request: express.Request, response: express.Response, next: any) {
  console.log(`${request.method} ${request.path}`);
  next();
}

function requireAuth(req: any, res: any, next: any) {

    const token = req.cookies.jwt;

    if( token ) {
        jwt.verify(token, 'joker', (err: any, decodedToken: any) => {
            if(err) {
                res.status(400).json({ msg: "User authentication failed. Access denied.", auth: false });
                console.log(err.message);
            } else {
                console.log("Token verified, access granted");
                next();
//                res.status(200).json({ msg: "User authentication successful. Access granted.", auth: true });
            }
        });
    } else {
        res.status(400).send("User authentication token missing. Access denied.");
    }

};

//=========================================================================================
//                                 Set up some middleware
//=========================================================================================
app.use(express.json());
app.use(cookieParser());
//app.use(loggerMiddleware);

//=========================================================================================
//                               Connect to the data base
//=========================================================================================
connect(mongoUri);
//try {
//    mongoose.connect(mongoUri, {}, () => {
//      console.log('1> MongoDB nameless connection established');
//    });
//
//    const connection = mongoose.connection; 
//
//    connection.once('open', () => {
//      console.log('2> MongoDB connection name: ' + connection.name);
//    });
//
//} catch(error) {
//    console.log(`MongoDB connection could not be established, error msg: ${error}`);
//}

//=========================================================================================
//                                 Configure routes
//=========================================================================================
const defaultRoute = require('./api/routes/default');
const portfolioRoute = require('./api/routes/portfolio');
const authRoutes = require('./api/routes/authRoutes');

app.use('/api/default', defaultRoute);
app.use('/api/portfolio', requireAuth);
//app.use('/api/portfolio', requireAuth2 );
app.use('/api/portfolio', portfolioRoute);
app.use('/api/auth', authRoutes);


//=========================================================================================
//                                Tell the Server to listen
//=========================================================================================
app.listen(port, () => {
    console.log(`App running on port ${port}`);
})