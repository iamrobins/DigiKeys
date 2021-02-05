import User from "../models/userModel.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (await User.findOne({$or: [{ name }, { email }]})) {
      res.status(401)
      throw new Error('Name or Email already exists');
    } else {
      const user = await User.create({name, email, password});
      sendToken(user, 201, res);
    }
    
  } catch(error) {
      return next(error);
  }
}

const loginUser = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    if(!await User.findOne({email})){
      res.status(401)
      throw new Error('Email not registered');
    }
    const user = await User.findOne({email}).select("+password");
    const isMatch = await user.matchPasswords(password);
    if(!isMatch) {
      res.status(401)
      throw new Error('Password is incorrect');
    };

    sendToken(user, 200, res);
  } catch(error) {
      return next(error);
  }
}

const forgotPassword = async (req, res, next) => {
  try {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) {
      res.status(401);
      throw new Error('User does not exists');
    } else {
      try {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        const resetToken = user.getResetPasswordToken();
        await user.save();
        const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;

        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>`;

        await sendEmail({
            to: user.email,
            subject: "Password Reset Request",
            text: message
          });
        res.status(200).json({success: true, data: "Email Sent"});
      } catch(error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        return next(error);
      }
    }
  } catch (error) {
      return next(error);
  }
}

const resetPassword = async(req, res, next) => {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: {$gt: Date.now()}
    })
    if(!user) {
      res.status(401)
      throw new Error('Invalid reset token');
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(201).json({success: true, data: "Password Reset Success"});
  } catch(error) {
    return next(error);
  }
}

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  const updatedUser = {
    _id: user._id,
    avatar: user.avatar,
    isAdmin: user.isAdmin,
    balance: user.balance,
    bio: user.bio,
    ratings: user.ratings,
    feedbacks: user.feedbacks,
    name: user.name,
    email: user.email,
    token: token
  }

  res.status(statusCode).json(updatedUser);
}

export {registerUser, loginUser, forgotPassword, resetPassword};