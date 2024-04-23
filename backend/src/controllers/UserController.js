const mongoose = require("mongoose");
const user = require("../models/userModel");


//  GET USER BY ID
const GetUserId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "No such info" });
    }

    const result = await user.findById(id);

    return !result
      ? res.status(400).json({ error: "No such info" })
      : res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  GET ALL USER
const GetAllUsers = async (req, res) => {
  try {
    const result = await user.find();

    return !result
      ? res.status(400).json({ error: "No such info" })
      : res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  CREATE USER
const CreateUsers = async (req, res) => {
  try {
    const {
      user_id,
      section,
      firstName,
      middleName,
      lastName,
      username,
      password,
      email,
      type,
    } = req.body;

    console.log(
      user_id,
      section,
      firstName,
      middleName,
      lastName,
      username,
      password,
      email,
      type,
    );

    const result = await user.create({
      user_id,
      section,
      firstName,
      middleName,
      lastName,
      username,
      password,
      email,
      type,
    });
    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE INFO
const DeleteUsers = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "No such info" });
    }

    const result = await user.findOneAndDelete({ _id: id });

    return !result
      ? res.status(400).json({ error: "No such info" })
      : res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE USERS
const UpdateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      user_id,
      section,
      firstName,
      middleName,
      lastName,
      username,
      password,
      email,
      verified,
      type,
      image,
      stars,
    } = req.body;

    const result = await user.findOneAndUpdate(
      { _id: id },
      {
        user_id,
        section,
        firstName,
        middleName,
        lastName,
        username,
        password,
        email,
        verified,
        type,
        image,
        stars,
      },
      { new: true }
    );

    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  CreateUsers,
  GetUserId,
  GetAllUsers,
  DeleteUsers,
  UpdateUsers,
};
