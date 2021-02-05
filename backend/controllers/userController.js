import User from "../models/userModel.js";
import Sale from "../models/saleModel.js";

const getUsers = async(req, res, next) => {
  if(!req.user.isAdmin) {
    res.status(401)
    throw new Error("Only admins can access this route");
  }
  const users = await User.find();
  res.status(200).json(users);
}

//search Users By Name, Diff output for admins and normal users
const searchUsersByName = async(req, res, next) => {
  let reg = new RegExp(req.params.name);
  try {
    const users = await User.find({ "name" : { $regex: reg, $options: 'i' } });
    if(users.length == 0) {
      res.status(404)
      throw new Error("No users found");
    }

    if(req.user.isAdmin) {
      res.status(200).json(users);
    } else {
      const updatedUser = users.map(user => {
        return {
          _id: user._id,
          avatar: user.avatar,
          name: user.name,
          email: user.email,
          bio: user.bio,
          ratings: user.ratings
        }
      })
      res.status(200).json(updatedUser);
    }
  } catch(error) {
    return next(error);
  }
}

//For Own Profile
  //Everything
//For Others Profile Dont Show these
  //Balance, TotalSales
const userProfile = async(req, res, next) => {
  try {
    const user = await User.findOne({name: req.params.name}); //returns null if not found
    if(user) {
      res.status(200).json(user);
    } else {
      res.status(404)
      throw new Error("User not found");
    }
  } catch(error) {
    return next(error);
  }
}

const displayFeedbacks = async(req, res, next) => {
  try {
    const user = await User.findOne({name: req.params.name});
    if(!user) {
      res.status(404);
      throw new Error("User not exists");
    }
    if(user.feedbacks.length === 0) {
      res.status(400);
      throw new Error("This user has no feedbacks");
    }
    res.status(200).json(user.feedbacks);
  }catch(error) {
    return next(error);
  }
}

const giveFeedback = async(req, res, next) => {
  try {
    const user = req.user.name;
    const {decision, comment} = req.body;
    const feedbackReciever = await User.findOne({name: req.params.name});

    if(feedbackReciever.feedbacks.find(feedback => feedback.name === req.user.name)) {
      res.status(400);
      throw new Error("You have already given your feedback");
    }
    
    const feedback = {
      name: user,
      decision,
      comment
    }

    if(decision === true){
      feedbackReciever.ratings = feedbackReciever.ratings +  1;
    }else {
      feedbackReciever.ratings =  feedbackReciever.ratings - 1;
    }
    
    feedbackReciever.feedbacks = [...feedbackReciever.feedbacks, feedback];
    await feedbackReciever.save();
    res.status(201).json({success: true});
  } catch(error) {
    return next(error);
  }
}

const editUser = async (req, res, next) => {
  const {name, bio, email} = req.body;
  const user = await User.findById(req.params.userId);
  user.name = name;
  user.bio = bio;
  user.email = email;

  if(req.body.password) {
    user.password = req.body.password;
  }
  if(req.body.avatar) {
    user.avatar = req.body.avatar;
  }
  await user.save();
  res.status(201).json(user);
}

const userSales = async (req, res, next) => {
  try {
    const sales = await Sale.find({sellerId: req.user._id});
    if(sales.length === 0) {
      res.status(404);
      throw new Error("User dont have any sales");
    }
    res.status(200).json(sales);
  }catch(error) {
    return next(error);
  }
}

export {getUsers, searchUsersByName, userProfile, displayFeedbacks, giveFeedback, editUser, userSales};