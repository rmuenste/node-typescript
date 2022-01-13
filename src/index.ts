import express from 'express';

//=========================================================================================
//                                 Set up express
//=========================================================================================
const app = express();
const cors = require('cors');

const PORT: number = 5001;
app.use(cors());
//=========================================================================================
//                                 Set up some middleware
//=========================================================================================
app.use(express.json());

//=========================================================================================
//                                 Configure routes
//=========================================================================================
const defaultRoute = require('./api/routes/default');
const portfolioRoute = require('./api/routes/portfolio');

app.use('/api/default', defaultRoute);
app.use('/api/portfolio', portfolioRoute);

//=========================================================================================
//                                Tell the Server to listen
//=========================================================================================
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})