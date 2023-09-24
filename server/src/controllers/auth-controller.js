import { User } from "../model/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    let status = "unauthenticated";
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json("Username and Password is required");

    const foundUser = await User.findOne({ username });

    if (!foundUser)
      return res.status(401).json("User not Found. Please Register to Login");

    const isPasswordMatching = await bcrypt.compare(
      password,
      foundUser.password
    );

    if (isPasswordMatching) {
      status = "authenticated";
      const { username } = foundUser._doc;
      // JWT Authentication goes here
      const accessToken = jwt.sign(
        {
          user: {
            username: username,
            userId: foundUser._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "1d" }
      );
      // res.cookie("access_token", accessToken, {
      //   // httpOnly: true,
      //   //   secure: true,
      //   // sameSite: "none",
      // });
      res.status(201).json({ username, status, accessToken });
    } else {
      res.clearCookie("access_token");
      return res.status(401).json("Invalid Credentials");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, phone, username, password } = req.body;

    const foundUser = await User.findOne({
      $or: [{ username: username }, { email: email }, { phone: phone }],
    });

    if (!foundUser) {
      // Encrypting password by hashing
      const saltPassword = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, saltPassword);

      const newUser = new User({
        name,
        email,
        phone,
        username,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(201).json("User Registered Successfully");
    } else {
      res.status(400).json("User already registered.Please Login");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const logout = (_req, res) => {
  try {
    // res.clearCookie("access_token");
    // res.status(200).json("Logged out");

    // Send a response with a new "Authorization" header that clears the token
    res.header("Authorization", "").status(200).json("Logged out");
  } catch (err) {
    res.status(500).json(err.message);
  }
};
