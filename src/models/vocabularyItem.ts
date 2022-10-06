import { Schema, model, Document, Model } from 'mongoose';

export interface RuGerItem extends Document {
  German: string;
  Article: string;
  Russian: string;
  repetitions: number;
  correct: number;
  percentage: number;
}

const rugerSchema = new Schema<RuGerItem>({
    German:  { type: String, required: true},
    Article: { type: String, required: true},
    Russian: { type: String, required: true},
    repetitions:{type: Number, required: true},
    correct:    {type: Number, required: true},
    percentage: {type: Number, required: true}
});


// When we store the data model in mongoDB, it will be saved in 
// a collection named 'users' <- the english plural corresponding
// to the chosen model name
//
// If the mongoDB we are connected to does not have a collection named 
// 'users' it will be created when the first instance of a <user> model 
// is added to the db.
const RuGerItems: Model<RuGerItem> = model<RuGerItem>('ru-ger-item', rugerSchema);

module.exports = RuGerItems;