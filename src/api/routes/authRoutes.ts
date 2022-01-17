export {};
const express = require('express');

const router = express.Router();

router.route('/signup/').get( (req: any, res: any) => {
  return res.status(200).json({message: "Hello from GET signup route!"});
});

router.route('/signup/').post( (req: any, res: any) => {
  return res.status(200).json({message: "Hello from POST signup route!"});
});

router.route('/login/').get( (req: any, res: any) => {
  return res.status(200).json({message: "Hello from GET login route!"});
});

router.route('/login/').post( (req: any, res: any) => {
  return res.status(200).json({message: "Hello from POST login route!"});
});

module.exports = router;