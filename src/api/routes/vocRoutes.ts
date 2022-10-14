export {};
import { RuGerItem } from "../../models/vocabularyItem";
import { Dictionary } from "../../models/dictionary";
const express = require('express');

const router = express.Router();

const User = require('../../models/user');

const Dictionaries = require('../../models/dictionary');
const ruGerItems = require('../../models/vocabularyItem');


//=========================================================================================
//                              rugervoc get Route 
//=========================================================================================
router.route('/rugervocall/').get( async (req: any, res: any) => {
    
  try {
    const userId = req.body.userId;
    var theUser = await User.find({_id: userId},{"dictionaries": 1}).lean();
    const items: Array<RuGerItem> = await ruGerItems.find();
    console.log("rugervocall: ");
    let object = theUser[0];
    let theItems = object.dictionaries[0].words;
    console.log("Object: %o",object.dictionaries[0].words);
    console.log("Object2: %o",items);
    res.status(200).json(theItems);
  }
  catch(error) {
    return res.status(400).json({message: "Error finding vocabulary items."});
  }

});

const findUser = async(req: any, res: any, userId: string) => {

  try {
    var theUser = await User.find({_id: userId}).lean();
    console.log(`The user: ${theUser}`, typeof theUser);
    console.log(`The user[0]: ${theUser[0]._id}`);
    return theUser;
  } catch(error) {
    return res.status(400).json({message: "Error finding current user."});
  }

} 

//=========================================================================================
//                              rugerdicts get Route 
//=========================================================================================
router.route('/rugervocdicts/').get( async (req: any, res: any) => {
    
  try {
    const userId = req.body.userId;
    const items: Array<Dictionary> = await Dictionaries.find();
    console.log("Object2: %o",items);
    res.status(200).json(items);
  }
  catch(error) {
    return res.status(400).json({message: "Error finding vocabulary dicts."});
  }

});

//=========================================================================================
//                              rugerlogsingleresult push Route 
//=========================================================================================
router.route('/rugerlogsingleresult/').post( async (req: any, res: any) => {
    
  const { wordStatistics } = req.body;
  let userId = req.body.userId;
  userId = "63400f7d91812d41641f56a7";
//  console.log("WordStatistics:");
  console.log("Results: ");
  for(let i=0; i < wordStatistics.length; i++) {
    console.log("Object: [%i] %o \n", i, wordStatistics[i]);
  }
//  //console.log("req.Body:");
  console.log(`Got user: ${userId}`);
  try {
//    let aUser = await User.find({ _id: userId}).lean();
//    console.log("User: %o \n", aUser);
    await User.updateOne({ _id: userId}, { $inc: { "dictionaries.0.words.$[elem].repetitions": 1}}, {arrayFilters: [{"elem._id": "62c2de96cbc55818e908828c"}]})
//    console.log(`WordId: ${wordId}`);
    //await User.updateOne({ _id: userId}, {$set: {name: "Hans"}});
//    await User.updateOne({ _id: userId}, {$set: {"wordStatistics.$[elem].repetitions": 0}}, {arrayFilters: [{"elem.repetitions": 1}]});
//    await User.updateOne({ _id: userId}, {$set: {"wordStatistics.$[elem].repetitions": 1}}, {arrayFilters: [{"elem.wordId": wordId}]});
//    await User.updateOne({ _id: userId}, {$set: {name: "Hans"}});
//    var theUser = await User.find({_id: userId});
//    console.log(`theUser: ${theUser}`);
//    var theUser = await User.find({_id: userId}).lean();
//    console.log(`WordId: ${wordId}`);
//    console.log(`WordId type: ${typeof wordId}`);
//    console.log(`The user[0].wordStatistics: ${theUser[0].wordStatistics[0].wordId}`);
//      let myUpdatedDoc = await User.updateOne({_id: userId}, {})
//    try {
//    //User.updateOne({ _id: userId}, {$set: {"wordStatistics.$[elem].repetitions": 1}}, {arrayFilters: [{"elem.wordId": wordId}]});
//    await User.updateOne({ _id: userId}, {$set: {name: "Georg"}});
//    } catch (er) {
//      return res.status(400).json({message: "Error updating current user."});
//    }
//    let theUser2 = await User.find({ _id: userId}, {arrayFilters: [{"elem.wordId": wordId}]});
//     db.users.updateOne({ _id: ObjectId("62b8b8e2714b1e822fb0efb1")}, {$set: {"wordStatistics.$[elem].repetitions": 0}}, {arrayFilters: [{"elem.wordId": ObjectId("62c2de96cbc55818e9088273")}]})
// B> db['ru-ger-items'].find().forEach(function (col) { print(col); });   
//db.users.updateOne({_id: ObjectId("62b8b8e2714b1e822fb0efb1")}, {$push:{"dictionaries.0.words": array[0]}})
//authDB> for (var i = 0; i < array.length; i++) {
//... db.users.updateOne({_id: ObjectId("62b8b8e2714b1e822fb0efb1")}, {$push:{"dictionaries.0.words": array[i]}});
//... }
//db.users.updateOne({"_id":ObjectId("63400f7d91812d41641f56a7")}, { $inc: { "dictionaries.0.words.$[elem].repetitions": 1}}, {arrayFilters: [{"elem._id": ObjectId("62c2de96cbc55818e908828c")}]})

    res.status(200).json({message: "All ok!", "user": userId});
  }
  catch(error) {
    return res.status(400).json({message: `Error finding current user: ${error}`});
  }

});



module.exports = router;
/*
[
  {
    _id: '62c2de96cbc55818e908828c',
    German: 'Ausweis',
    Article: 'der',
    Russian: 'паспорт',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e9088285',
    German: 'Dusche',
    Article: 'die',
    Russian: 'душ',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e908827c',
    German: 'Keller',
    Article: 'der',
    Russian: 'подвал',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e9088282',
    German: 'Kissen',
    Article: 'das',
    Russian: 'подушка',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e9088287',
    German: 'Backofen',
    Article: 'der',
    Russian: 'духовка',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e908827e',
    German: 'Stuhl',
    Article: 'der',
    Russian: 'стул',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e908828b',
    German: 'Kühlschrank',
    Article: 'der',
    Russian: 'холодильнк',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e9088273',
    German: 'Organisation',
    Article: 'die',
    Russian: 'организация',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e9088276',
    German: 'Tisch',
    Article: 'der',
    Russian: 'стол',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e908828a',
    German: 'Lampe',
    Article: 'die',
    Russian: 'лампа',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e9088279',
    German: 'Schlafzimmer',
    Article: 'das',
    Russian: 'спальня',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e908827d',
    German: 'Sofa',
    Article: 'das',
    Russian: 'диван',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e9088280',
    German: 'Wohnung',
    Article: 'die',
    Russian: 'квартира',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e9088275',
    German: 'Haus',
    Article: 'das',
    Russian: 'дом',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e9088289',
    German: 'Toilette',
    Article: 'die',
    Russian: 'туалет',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e9088288',
    German: 'Waschbecken',
    Article: 'das',
    Russian: 'раковина',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e9088278',
    German: 'Boden',
    Article: 'der',
    Russian: 'пол',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e908827b',
    German: 'Küche',
    Article: 'die',
    Russian: 'кухня',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e9088283',
    German: 'Badewanne',
    Article: 'die',
    Russian: 'ванна',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e908827f',
    German: 'Tür',
    Article: 'die',
    Russian: 'дверь',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e9088274',
    German: 'Fenster',
    Article: 'das',
    Russian: 'окно',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e9088277',
    German: 'Wand',
    Article: 'die',
    Russian: 'стена',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e9088284',
    German: 'Mikrowelle',
    Article: 'die',
    Russian: 'микроволновка',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e908827a',
    German: 'Badezimmer',
    Article: 'das',
    Russian: 'ванная комната',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e9088281',
    German: 'Bett',
    Article: 'das',
    Russian: 'кровать',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  },
  {
    _id: '62c2de96cbc55818e9088286',
    German: 'Spülmaschine',
    Article: 'die',
    Russian: 'посудомойка',
    repetitions: 1,
    correct: 1,
    percentage: 0,
    success: true
  }
]
*/