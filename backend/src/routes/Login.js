const express = require("express");
const router = express.Router();

const {
    Signin,
  
  } = require("../controllers/LoginController");


router.get("/", Signin);



module.exports = router;