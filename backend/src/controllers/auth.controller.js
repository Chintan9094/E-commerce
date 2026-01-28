import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import { AppError } from "../utils/AppError.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, phone, dob, gender, shopName, gstNo } = req.body;

    if (!name || !email || !password || !phone || !dob || !gender) {
      return next(new AppError("All fields required", 400));
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return next(new AppError("Email already exists", 400));
    }

    if (gstNo) {
      const gstExist = await User.findOne({ gstNo });
      if (gstExist) {
        return next(new AppError("GST number already exists", 400));
      }
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      phone,
      dob,
      gender,
      shopName,
      gstNo
    });

    const token = generateToken({ id: user._id });

    res.cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "User registered!",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return next(new AppError("Email & password required",400));
        }

        const user = await User.findOne({ email });

        if(!user){
            return next(new AppError("User not found",404));
        }

        const match = await bcrypt.compare(password, user.password);

        if(!match){
            return next(new AppError("Invalid credentials",400));
        }

        const accessToken = generateToken({id: user._id, role: user.role});

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,        
            sameSite: "lax",     
            path: "/",           
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            domain: undefined,  
        });

        res.json({
            success: true,
            message: "Login successful!",
            user
        });
        
    } catch (error) {
        next(error);
    }
};

export const logoutUser = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.json({
    success: true,
    message: "Logged out successfully"
  });
};

export const getMyProfile = (req, res) => {
    res.json({
        success: true,
        user: req.user,
    });
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, email, phone, dob, gender, shopName, gstNo } = req.body;
    const user = req.user;

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (shopName) user.shopName = shopName;
    if (gstNo) user.gstNo = gstNo;
    if (dob) user.dob = dob;
    if (gender) user.gender = gender;

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};
