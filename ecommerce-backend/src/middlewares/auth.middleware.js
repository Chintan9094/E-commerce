import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    console.log("Cookies received:", req.cookies);
    console.log("Authorization header:", req.headers.authorization);

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token && req.cookies?.accessToken) {
        token = req.cookies.accessToken;
    }

    if (!token) {
      console.log("No token found - cookies:", req.cookies, "headers:", Object.keys(req.headers));
      return next(new AppError("Not authorized, token missing", 401));
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode.id).select("-password");

    if (!user) {
      return next(new AppError("User not found", 401));
    }

    req.user = user;
    next();

  } catch (error) {
    if (error.name === "TokenExpiredError")
      return next(new AppError("Token expired, login again!", 401));

    return next(new AppError("Invalid token", 401));
  }
};


export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new AppError("Oops! This page is for admins only",403));
        }
        next();
    };
};