const mongoose = require("mongoose");
const Word = require("../models/WordModel");

const GetWordsByRandom = async (req, res) => {
  try {
    const result = Word.aggregate([{ $sample: { size: 12 } }]);
    let output = [];
    for await (const item of result) {
      output.push(item);
    }

    return !result
      ? res
          .status(400)
          .json({ error: `No such service for E-learning ${brgy}` })
      : res.status(200).json(output);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  GET A SINGLE ID
const GetWordById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "No such info" });
    }

    const result = await Word.findById(id);

    return !result
      ? res.status(400).json({ error: "No such info" })
      : res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// CREATE A WORD
const CreateWords = async (req, res) => {
  try {
    const { word, type, category, audio } = req.body;

    const result = await Word.create({ word, type, category, audio });

    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE A WORD
const UpdateWords = async (req, res) => {
  try {
    const { id } = req.params;
    const { word, type, category, audio } = req.body;

    const result = await Word.findOneAndUpdate(
      { _id: id },
      { word, type, category, audio },
      { new: true }
    );

    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE A WORD
const DeleteWords = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "No such info" });
    }

    const result = await Word.findOneAndDelete({ _id: id });

    return !result
      ? res.status(400).json({ error: "No such info" })
      : res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  GetWordsByRandom,
  GetWordById,
  CreateWords,
  UpdateWords,
  DeleteWords,
};
