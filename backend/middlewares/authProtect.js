import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authProtect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401)
    throw new Error("Not authorized to access this route");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(404)
      throw new Error("No user found invalid token");
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(401)
    throw new Error("Not authorized to access this route");
  }
};

export default authProtect;