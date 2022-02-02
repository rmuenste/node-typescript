export {};
const express = require('express');

const router = express.Router();

const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const maxAge: number = 24 * 60 * 60;
function createToken (id: number) {
  // TODO: place secret in .env file
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
router.route('/login/').post( async (req: any, res: any) => {

  const { email, password } = req.body;
  console.log(`Got user ${email} and password ${password}`);
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
    console.log("Cookie added");
    return res.status(200).json({user: user._id});
  }
  catch(error) {
    let errorMsg = "";
    if (error === "incorrect password")
        errorMsg = "Incorrect password";
    else if (error === "incorrect email")
        errorMsg = "Incorrect email";
    else 
        errorMsg = "Error during authentication";

    console.log(`This is the error ${error}`);
    return res.status(400).json({message: errorMsg});
  }

});

//=========================================================================================
//                              Login Get Route 
//=========================================================================================
router.route('/logout/').get( (req: any, res: any) => {

  res.cookie('jwt', '', {httpOnly: true, maxAge: 1});
  console.log("Cookie added");
  return res.status(200).json({message: "You are now logged out."});
});


module.exports = router;