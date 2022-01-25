const mongoose = require('mongoose');

import { Schema } from 'mongoose';

const bcrypt = require('bcrypt');

/*
Statics in Typescript 

interface IUser {
    name: string;
}

interface UserModel extends Model<IUser> {
    myStaticMethod(): number;
}

const schema = new Schema<IUser, UserModel>({ name: String });
schema.static('myStaticMethod', function myStaticMethod() {
    return 42;
});

const User = model<IUser, UserModel>('User', schema);

const answer: number = User.myStaticMethod();
*/

interface User {
    email: string;
    password: string;
}

const userSchema = new Schema<User>({
    email: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    }
});

// We 'hook up' the mongoose schema <userSchema> to the mongoose hooks
// pre-save and post-save
userSchema.pre('save', async function(next: Function) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    console.log('User about to be created and saved');
    next();
})

// When we store the data model in mongoDB, it will be saved in 
// a collection named 'users' <- the english plural corresponding
// to the chosen model name
//
// If the mongoDB we are connected to does not have a collection named 
// 'users' it will be created when the first instance of a <user> model 
// is added to the db.
const User = mongoose.model('user', userSchema);



module.exports = User;