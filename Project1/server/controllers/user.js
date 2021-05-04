const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Register = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  //Simple validation
  if (!username || !password)
    return res.status(400).json({
      success: false,
      message: "Missing username and/or password !!!",
    });

  try {
    //Check for existing user
    const user = await User.findOne({ username });
    if (user)
      return res
        .status(400)
        .json({ success: false, massage: "Username already taken" });

    // All good
    const hashedPassword = await argon2.hash(password);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Return token

    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    return res.json({
      success: false,
      massage: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, massage: "Internal server error" });
  }
};

const Login = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  //Simple validation
  if (!username || !password)
    return res.status(400).json({
      success: false,
      message: "Missing username and/or password !!!",
    });
  try {
    //Check for existing user
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, massage: "Incorrect username or password" });

    // Username found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, massage: "Incorrect username or password" });
    //All good
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    return res.json({
      success: false,
      massage: "Login successfully",
      accessToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, massage: "Internal server error" });
  }
};

module.exports = {
  Register,
  Login,
};
