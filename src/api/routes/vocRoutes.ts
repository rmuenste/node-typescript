export {};
import { RuGerItem } from "../../models/vocabularyItem";
const express = require('express');

const router = express.Router();

const ruGerItems = require('../../models/vocabularyItem');


//=========================================================================================
//                              rugervoc get Route 
//=========================================================================================
router.route('/rugervocall/').get( async (req: any, res: any) => {
    
  try {
    const items: Array<RuGerItem> = await ruGerItems.find();
    console.log(items);
    res.status(200).json(items);
  }
  catch(error) {
    return res.status(400).json({message: "Error finding vocabulary items."});
  }

});

module.exports = router;