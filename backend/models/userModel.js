import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const feedbackSchema = mongoose.Schema({
  name: {type: String, required: true},
  decision: {type: Boolean, required: true},
  comment: {type: String, required: true}
}, {
  timestamps: true
})

const userSchema = new mongoose.Schema({
  name: { type: String, required: true , unique: true },
  avatar: { type: String, default: "https://cdn.wpbeginner.com/wp-content/uploads/2012/08/gravatarlogo.jpg" },
  bio: { type: String, default: "A modern seller of digital products" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false, minlength: 6 },
  isAdmin: { type: Boolean, default: false },
  balance: { type: Number,  default: 0 },
  ratings: { type: Number, default: 0 },
  feedbacks: [feedbackSchema],
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { timestamps: true })

//middleware
userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

//methods
userSchema.methods.matchPasswords = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.getSignedToken = function() {
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
}

userSchema.methods.getResetPasswordToken = function() {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
  return resetToken;
}

const User = mongoose.model("User", userSchema);
export default User;