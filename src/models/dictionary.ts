import { Schema, model, Document, Model } from 'mongoose';

export interface Dictionary extends Document {
  name: string;
}

const dictionarySchema = new Schema<Dictionary>({
    name:  { type: String, required: true},
}, {collection: "Dictionaries"});


// When we store the data model in mongoDB, it will be saved in 
// a collection named 'users' <- the english plural corresponding
// to the chosen model name
//
// If the mongoDB we are connected to does not have a collection named 
// 'users' it will be created when the first instance of a <user> model 
// is added to the db.
const Dictionaries: Model<Dictionary> = model<Dictionary>('Dictionary', dictionarySchema);

module.exports = Dictionaries;
