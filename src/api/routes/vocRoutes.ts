export {};
import { RuGerItem } from "../../models/vocabularyItem";
const express = require('express');

const router = express.Router();

const User = require('../../models/user');

const ruGerItems = require('../../models/vocabularyItem');


//=========================================================================================
//                              rugervoc get Route 
//=========================================================================================
router.route('/rugervocall/').get( async (req: any, res: any) => {
    
  try {
    const userId = req.body.userId;
    var theUser = await User.find({_id: userId});
    const items: Array<RuGerItem> = await ruGerItems.find();
//    console.log(items);
    console.log("rugervocall: ");
    console.log(theUser);
    let theData = theUser[0].wordStatistics;
    res.status(200).json(items);
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
//                              rugerlogsingleresult push Route 
//=========================================================================================
router.route('/rugerlogsingleresult/').post( async (req: any, res: any) => {
    
  const { wordStatistics } = req.body;
  const userId = req.body.userId;
  console.log("WordStatistics:");
  console.log(wordStatistics);
  //console.log("req.Body:");
  //console.log(req.body);
  try {
    console.log("rugerlogsingleresult route");
//    console.log(`WordId: ${wordId}`);
    //await User.updateOne({ _id: userId}, {$set: {name: "Hans"}});
//    await User.updateOne({ _id: userId}, {$set: {"wordStatistics.$[elem].repetitions": 0}}, {arrayFilters: [{"elem.repetitions": 1}]});
//    await User.updateOne({ _id: userId}, {$set: {"wordStatistics.$[elem].repetitions": 1}}, {arrayFilters: [{"elem.wordId": wordId}]});
//    await User.updateOne({ _id: userId}, {$set: {name: "Hans"}});
    var theUser = await User.find({_id: userId});
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

    res.status(200).json({message: "All ok!"});
  }
  catch(error) {
    return res.status(400).json({message: `Error finding current user: ${error}`});
  }

});

module.exports = router;