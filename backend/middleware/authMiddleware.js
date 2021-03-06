import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //console.log(decoded);
      req.user = await User.findById(decoded.id).select("-password");
      console.log(req.user._id);
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("No Authorized Token Failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, No Token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    //res.status(401);
    //throw new Error("Nott Authorized as Adminn");
    res.status(401);
    throw new Error("Nott Authorized as Adminn");
  }
};

export { protect, admin };
