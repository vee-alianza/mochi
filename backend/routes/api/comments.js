const express = require("express");
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Story, Comment, storyLike, commentLike, Category } = require('../../db/models');
const router = require("./stories");

// GET comments
router.post('/', requireAuth, asyncHandler(async (req, res) => {
  const { storyId, content, userId } = req.body;
  // const story
  const comments = await Comment.findAll({
    order: [["createdAt", "DESC"]],
  });
  return res.json({
    comments,
  })

}));

// PATCH comment
// DELETE comment

module.exports = router;
