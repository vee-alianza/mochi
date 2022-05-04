const express = require("express");
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Story, Comment, storyLike, commentLike, } = require('../../db/models');

const router = express.Router();

// const validateComment = [
//   check("body")
//     .isLength({ min: 1 })
//     .withMessage("Please enter a comment"),
//   handleValidationErrors
// ]

// GET comments
router.get('/', requireAuth, asyncHandler(async (req, res) => {
  const comments = await Comment.findAll({
    order: [["createdAt", "DESC"]],
  });
  return res.json({
    comments,
  })

}));

// GET comments by id
router.get('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
  const comments = await Comment.findByPk(id, {
    order: [["createdAt", "DESC"]],
  });
  return res.json({
    comments,
  })

}));

// POST comment
router.post('/new', requireAuth, asyncHandler(async (req, res) => {
  const { storyId, content, userId } = req.body;
  const comment = {
    storyId,
    content,
    userId,
  }

  const newComment = await Comment.crate(comment)
  return res.json({
    newComment,
  })

}));

//PATCH comment

// DELETE comment
router.delete('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
  const comment = await Comment.findByPk(id);
  await comment.destroy();

  return res.json({
    comment,
  })

}));

module.exports = router;
