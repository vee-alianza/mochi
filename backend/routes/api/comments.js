const express = require("express");
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Story, Comment, storyLike, commentLike, } = require('../../db/models');


const router = express.Router();

// const validateComment = [
//   check("content")
//     .isLength({ min: 1, max: 255 })
//     .withMessage("Please enter a comment"),
//   handleValidationErrors
// ]

// GET comments
router.get('/', requireAuth, asyncHandler(async (req, res) => {
  const comments = await Comment.findAll({
    order: [["createdAt", "ASC"]],
  });
  return res.json({
    comments,
  })

}));

// GET comments by id
router.get('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comments = await Comment.findByPk(id, {
    order: [["createdAt", "ASC"]],
    include: [User]
  });
  return res.json({
    comments,
  })

}));

// POST comment
router.post('/new', requireAuth, asyncHandler(async (req, res) => {
  const { storyId, content } = req.body;
  const userId = req.user.id;
  const comment = {
    storyId,
    content,
    userId,
  };
  const createdComment = await Comment.create(comment);
  const queryComment = await Comment.findByPk(createdComment.id, {
    include: [User]
  });
  const newComment = JSON.parse(JSON.stringify(queryComment));

  newComment.likes = 0;

  return res.json({ newComment });
}));

// POST comment
router.post('/:id(\\d+)/like', requireAuth, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const userCommentLike = await commentLike.findOne({
      where: {
        commentId: id,
        userId
      }
    });
    if (!userCommentLike) {
      await commentLike.create({
        commentId: id,
        userId
      });

      return res.send('success');
    } else {
      throw new Error('User has already liked comment');
    }
  } catch (error) {
    res.status(500);
    res.send(`${error}`);
  }
}));

// DELETE comments
router.delete('/:id(\\d+)/like', requireAuth, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const userCommentLike = await commentLike.findOne({
      where: {
        commentId: id,
        userId
      }
    });
    if (userCommentLike) {
      await userCommentLike.destroy();
      return res.send('success');
    } else {
      throw new Error('User has already unliked comment');
    }
  } catch (error) {
    res.status(500);
    res.send(`${error}`);
  }
}));

// DELETE comments
router.delete('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  // console.log("COMMENTS delete route backend")
  try {
    const comment = await Comment.findByPk(id);
    if (userId !== comment.userId) {
      res.status(401);
      return res.send("Unauthorized");
    }
    await comment.destroy();
    return res.send("Success");
  } catch (error) {
    res.status(500);
    res.send(`${error}`);
  }
}));

module.exports = router;
