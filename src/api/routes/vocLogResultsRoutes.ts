export {};
import { RuGerItem } from "../../models/vocabularyItem";

const express = require('express');

const User = require('../../models/user');

const router = express.Router();

//=========================================================================================
//                              rugerlogsingleresult push Route 
//=========================================================================================
router.route('/rugerlogsingleresult/').push( async (req: any, res: any) => {
    
  const userId = req.body.userId;
  try {
    console.log("rugerlogsingleresult route");
    const theUser = await User.find({_id: userId});
    console.log(theUser);
    res.status(200).json(theUser);
  }
  catch(error) {
    return res.status(400).json({message: "Error finding current user."});
  }

});

module.exports = router;