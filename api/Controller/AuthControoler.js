import User from "../Models/UserModel.js"
import bcrypt from "bcrypt"
import {errorHandler} from "../util/eroor.js"
import jwt from "jsonwebtoken"
import validator from "validator"

// signup waaye qaybtaaan
export  const signup = async(req,res,next)=> {
    console.log(req.body)
    function validateProfilePicture(photo) {
      return validator.isURL(photo);
    }
    const {username,email,password} = req.body
    const Hashedpssword = await bcrypt.hash(password,10)
    const newuser =  new User({username,email,password:Hashedpssword})

    try{

        await  newuser.save()
        res.status(200).json({mssge : "createed accounte"})

    }
    catch (error) {
        next(error);
        res.status(200).json({mssge : "some thing rounde"})
      }

    


}




export const signin = async (req, res, next) => {
    const { email,password} = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, 'User not found'));
      const validPassword = bcrypt.compare(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'wrong credentials'));
      const token = jwt.sign({ id: validUser._id },  process.env.SECRET);
      const { password: Hashedpssword, ...rest } = validUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      console.log(validUser)
      console.log(rest)
      res
        .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  };

  export const signout = (req, res) => {
    res.clearCookie('access_token').status(200).json('Signout success!');
  };


 
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id },process.env.SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id },process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};