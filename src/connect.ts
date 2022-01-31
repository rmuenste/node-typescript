import mongoose from 'mongoose';


export default (db: string) => {

    const connect = () => {
        mongoose.connect(db, { })
        .then ( () => {
            console.log("Connected successfully");
        })
        .catch(err => {
            console.log("Error connecting to database: ", err);
        })
    };

    connect();

};