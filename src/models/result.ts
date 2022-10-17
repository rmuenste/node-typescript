const mongoose = require('mongoose');
import { Schema, model, Document, Model, ObjectId } from 'mongoose';

export interface ResultItem {
    wordId: ObjectId,
    percentage: Number,
    repetitions: Number,
    correct: Number
}

export interface Result extends Document {
  user: ObjectId,
  A1: [
    {
        wordId: ObjectId,
        percentage: Number,
        repetitions: Number,
        correct: Number
    }
  ];
}

const resultSchema = new Schema<Result>({
    user:  { type: mongoose.ObjectId, required: true},
    A1: [
    {
        wordId: mongoose.ObjectId,
        percentage: Number,
        repetitions: Number,
        correct: Number
    }
    ]
}, {collection: "results"});

const Dictionaries: Model<Result> = model<Result>('Result', resultSchema);

module.exports = Dictionaries;