import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "user already exists" });
    }
    const userModel = new User({ username, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(200).json({ message: "Signup successfully", success: true });
  } catch (error) {
    res.status(500).json({ error: "Signup failed", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "auth failed" });
    }

    const ispassword = await bcrypt.compare(password, user.password);
    if (!ispassword) return res.status(403).json({ message: "auth failed" });

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successfully",
      success: true,
      jwtToken,
      email,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ error: "Signup failed", error });
  }
};
