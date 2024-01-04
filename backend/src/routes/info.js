const express = require("express");
const router = express.Router();

const {
  getInfo,
  getAllInfo,
  createInfo,
  updateInfo,
  deleteInfo,
} = require("../controllers/infoController");

router.get("/", getAllInfo);
router.get("/:id", getInfo);
router.post("/", createInfo);
router.patch("/:id", updateInfo);
router.delete("/:id", deleteInfo);

module.exports = router;
