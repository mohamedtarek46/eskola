import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { comparePassword, hashPassword } from "../../utils/hashingPassword.js";
import cookieOptions from "../../config/cookieOptions.js";

export const logoutUser = async (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
};

export const loginUser = async (req, res) => {

  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password",
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await comparePassword(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.JWT_SECRET,
    );
    res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json({
        message: "Login success",
        user: {
          _id: user._id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export const createUser = async (req, res) => {
  const isExist = await User.findOne({ email: req.body.email });
  if (isExist) {
    return res.status(400).json({ message: "Email already exists" });
  }
  try {
    if (req.body.role === "admin") {
      return res.status(400).json({ message: "Admin role is not allowed" });
    }
    const hashedPassword = await hashPassword(req.body.password);
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });

    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.JWT_SECRET,
    );

    res
      .status(201)
      .cookie("token", token, cookieOptions)
      .json({
        message: "User created",
        user: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.clearCookie("token").status(400).json({ error: err.message });
  }
};

export const updateMe = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName },
      { new: true },
    ).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
