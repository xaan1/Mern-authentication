


import bcyrpt from "bcrypt"
// update user in firebox
import User from "../Models/UserModel.js";

import { errorHandler } from "../util/eroor.js";


export const updateuser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
   
      return res.status(200).json('You can update only your account!');
    }
  
    try {
      if (req.body.password) {
        req.body.password = await bcyrpt.hash(req.body.password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture,
          }, 
        },
        { new: true }
      );
  
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  };


  export const dleted = async(req,res,next)=> {

    if (req.user.id !== req.params.id) {
   
        return res.status(200).json('You can dleletd only your account!');
      }


      try {
         await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user delted acounte");

      } catch(e){
        console.log(e)
      }
  }