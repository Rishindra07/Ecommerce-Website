import express from 'express'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

  const router = express.Router();

  // Sign up route
  router.post('/signup', async (req, res) => {
    console.log("Hello from the signup");
    
    const { email, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }
    if(!email || !password || !confirmPassword){
      return res.status(400).json({msg:'All feilds are required'});
    }
    if(password !== confirmPassword){
      return res.status(400).json({msg:'Password and Confirm Password doesn\'t match'});
    }
    const emailPattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    if(!emailPattern.test(email)){
      return res.status(400).json({'msg':'Email is Invalid'});
    }
    try {
      const userExists = await User.findOne({email:email});
      if(!userExists){
        const newUser = new User({email,password,role});
        await newUser.save();
        return res.status(201).json({'msg':"Account created Succesfully"});
      }
      else{
          return res.status(405);
      }
    } catch (error) {
      console.log("Error occured during creating user",error);
    }
  });

// Login route
router.post('/login', async (req, res) => {
  try {
    console.log("Hello from the login");
      const { email, password } = req.body;

      const emailPattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email)) {
        return res.status(400).json({ msg: 'Email is Invalid' });
      }

      const loggedUser = await User.findOne({ email });
      if (!loggedUser) {
        return res.status(404).json({ msg: 'User not found' });
      }

      const isMatch = await loggedUser.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Password is incorrect' });
      }

      const payload = { id: loggedUser._id, email: loggedUser.email };
      const token = jwt.sign(payload, 'your_secret', { expiresIn: '1h' });

      return res.status(200).json({ msg: 'Login Successful', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Server error' });
    }
});

export default router;