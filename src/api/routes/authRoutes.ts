export {};
const express = require('express');

const router = express.Router();

const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const maxAge: number = 24 * 60 * 60;
function createToken (id: number) {
  return jwt.sign({ id }, 'joker', {expiresIn: maxAge});
}

//=========================================================================================
//                              Signup Get Route 
//=========================================================================================
router.route('/signup/').get( (req: any, res: any) => {
  return res.status(200).json({message: "Hello from GET signup route!"});
});

//=========================================================================================
//                              Signup Post Route 
//=========================================================================================
router.route('/signup/').post( async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({email, password}); 
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
    return res.status(201).json({user: user._id});
  } catch (err) {
    console.log(err);
    res.status(400).send('error, user not created');
  }
});

//=========================================================================================
//                              Login Get Route 
//=========================================================================================
router.route('/login/').get( (req: any, res: any) => {
  return res.status(200).json({message: "Hello from GET login route!"});
});

//=========================================================================================
//                              Login Post Route 
//=========================================================================================
router.route('/login/').post( (req: any, res: any) => {
  return res.status(200).json({message: "Hello from POST login route!"});
});


router.route('/set-cookies/').get( (req: any, res: any) => {

  res.cookie('newUser', false);
  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true});
  res.send("You got cookies");

});

router.route('/read-cookies/').get( (req: any, res: any) => {

  const cookies = req.cookies;
  console.log(cookies);

  res.json(cookies);

});

module.exports = router;