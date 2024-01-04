const express = require("express");
const router = express.Router();
const Island = require("../models/IslandModel");

const {
  GetIslandsByRandom,
  GetIslandsById,
  CreateIslands,
  UpdateIslands,
  DeleteIslands,
} = require("../controllers/IslandController");

// const upload = require("../config/Multer");

// GET ALL RANDOMWORDS
router.get("/", GetIslandsByRandom);

//  GET WORDS BY ID
router.get("/:id", GetIslandsById);

//  POST A NEW WORDS
router.post("/", CreateIslands);

// UPDATE A WORDS
router.patch("/:id", UpdateIslands);

//
router.delete("/:id", DeleteIslands);

// router.post("/", upload.array("files", 10), CreateServices);
// router.patch("/:id", upload.array("files", 10), UpdateServices);
// router.patch("/archived/:id", ArchiveService);

module.exports = router;
