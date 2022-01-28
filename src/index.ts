import express from 'express';
import dotenv from "dotenv";
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

dotenv.config({path: __dirname + '/../.env'}); 
//=========================================================================================
//                                 Set up express
//=========================================================================================
const app = express();
const cors = require('cors');

// const PORT: number = (process.env.PORT as number) || 5001;
const port = process.env.PORT ?? 5001;
const mongoUri = process.env.LOCAL_MONGO_URI;

app.use(cors());
//=========================================================================================
//                                 Set up some middleware
//=========================================================================================
app.use(express.json());
app.use(cookieParser());

//=========================================================================================
//                               Connect to the data base
//=========================================================================================
try {
    mongoose.connect(mongoUri, {}, () => {
      console.log('1> MongoDB nameless connection established');
    });

    const connection = mongoose.connection; 

    connection.once('open', () => {
      console.log('2> MongoDB connection name: ' + connection.name);
    });

} catch(error) {
    console.log(`MongoDB connection could not be established, error msg: ${error}`);
}

//=========================================================================================
//                                 Configure routes
//=========================================================================================
const defaultRoute = require('./api/routes/default');
const portfolioRoute = require('./api/routes/portfolio');
const authRoutes = require('./api/routes/authRoutes');

app.use('/api/default', defaultRoute);
app.use('/api/portfolio', portfolioRoute);
app.use('/api/auth', authRoutes);


//=========================================================================================
//                                Tell the Server to listen
//=========================================================================================
app.listen(port, () => {
    console.log(`App running on port ${port}`);
})