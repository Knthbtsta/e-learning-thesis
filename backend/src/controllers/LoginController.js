const mongoose = require("mongoose");
const User = require('../models/userModel');

const Signin = async (req, res) => {
  try {
    const { username, password} = req.query;
    // Check if the user with the provided username and password exists in the database
    const user = await User.find({ username, password });
    console.log(username, password)
    if (user.length === 1) {
      // If the user exists, send a success response
      res.status(200).json(user);
    } else {
      // User with the provided username and password doesn't exist
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

  module.exports = {
    Signin,
  };