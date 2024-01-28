const express = require("express");
const router = express.Router();

const {
    CreateUsers,
    GetUserId,
    GetAllUsers,
    DeleteUsers,
    UpdateUsers,
  } = require("../controllers/UserController");

// GET ALL USER
router.get("/", GetAllUsers);

// GET USER BY ID
router.get("/:id", GetUserId);

//  POST A NEW WORDS
router.post("/", CreateUsers);

//  DELETE A USER
router.delete("/:id", DeleteUsers);

// UPDATE A USER
router.patch("/:id", UpdateUsers);

module.exports = router;