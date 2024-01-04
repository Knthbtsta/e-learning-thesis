const express = require("express");
const router = express.Router();

const {
  CreateQuiz,
  GetAllQuiz,
  DeleteQuiz,
  UpdateQuiz,
  GetQuizId,

  } = require("../controllers/QuizController");

  router.post("/", CreateQuiz);
  router.get("/", GetAllQuiz);
  router.get("/:id", GetQuizId );
  router.patch("/:id", UpdateQuiz);
  router.delete("/:id", DeleteQuiz);
  module.exports = router;