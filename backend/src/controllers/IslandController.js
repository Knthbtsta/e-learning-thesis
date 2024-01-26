const Island = require("../models/IslandModel");
const mongoose = require("mongoose");

// GET WORDS ON THE ISLAND ON RANDOM
const GetIslandsByRandom = async (req, res) => {
  try {
    const result = await Island.find({});
    return !result
    
      ? res
          .status(400)
          .json({ error: `No such service for E-learning ` })
      : res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.response });
    
  }
};

//  GET A SINGLE ID
const GetIslandsById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "No such info" });
    }

    const result = await Island.findById(id);

    return !result
      ? res.status(400).json({ error: "No such info" })
      : res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// CREATE A DIFFCULTY FOR EVERY ISLAND
const CreateIslands = async (req, res) => {
  try {
    const { dungeonName, difficulty, maxlvl, items } = req.body;

    const result = await Island.create({
      dungeonName,
      difficulty,
      maxlvl,
      items,
    });

    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE A ISLAND
const UpdateIslands = async (req, res) => {
  try {
    const { id } = req.params;
    const { dungeonName, difficulty, maxlvl, items } = req.body;

    const result = await Island.findOneAndUpdate(
      { _id: id },
      { dungeonName, difficulty, maxlvl, items },
      { new: true }
    );

    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const DeleteIslands = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "No such info" });
    }

    const result = await Island.findOneAndDelete({ _id: id });

    return !result
      ? res.status(400).json({ error: "No such info" })
      : res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  GetIslandsByRandom,
  GetIslandsById,
  CreateIslands,
  UpdateIslands,
  DeleteIslands,
};
