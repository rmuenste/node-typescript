const mongoose = require('mongoose');

import { Schema, Model, ObjectId } from 'mongoose';

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
    name: string;
    password: string;
    wordStatistics: [];
}

interface UserModel extends Model<User> {
    login(): void;
}

const userSchema = new Schema<User, UserModel>({
    email: {
        type: String, 
        required: true,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        required: false,
        minLength: 3
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    wordStatistics: [{
      wordId: mongoose.ObjectId,
      percentage: Number,
      repetitions: Number,
      correct: Number
    }]
});

userSchema.static('login', async function login(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if(auth) {
          return user;
      }
      throw 'incorrect password';
    }
    throw 'incorrect email';
});

//userSchema.static('getUserData', async function getUserData(email, password) {
//    const user = await this.findOne({ email });
//    if (user) {
//      const auth = await bcrypt.compare(password, user.password);
//      if(auth) {
//          return user;
//      }
//      throw 'incorrect password';
//    }
//    throw 'incorrect email';
//});

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