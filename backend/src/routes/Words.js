const express = require("express");
const router = express.Router();
const Word = require("../models/WordModel");

const {
  GetWordsByRandom,
  GetWordById,
  CreateWords,
  UpdateWords,
  DeleteWords,
} = require("../controllers/WordController");

// const upload = require("../config/Multer");

// GET ALL RANDOMWORDS
router.get("/", GetWordsByRandom);

//  GET WORDS BY ID
router.get("/:id", GetWordById);

//  POST A NEW WORDS
router.post("/", CreateWords);

// UPDATE A WORDS
router.patch("/:id", UpdateWords);

//
router.delete("/:id", DeleteWords);

// router.post("/", upload.array("files", 10), CreateServices);
// router.patch("/:id", upload.array("files", 10), UpdateServices);
// router.patch("/archived/:id", ArchiveService);

module.exports = router;
