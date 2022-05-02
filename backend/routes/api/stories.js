const express = require("express");
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Story, Comment, storyLike, commentLike, Category } = require('../../db/models');

const router = express.Router();

// HOMEPAGE
// GET stories
router.get('/', asyncHandler(async (req, res) => {
    const stories = await Story.findAll({
        order: [["createdAt", "DESC"]],
    });
    return res.json({
        stories,
    });
}));

// GET stories id
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const story = await Story.findByPk(id, {
        include: [User, Category, storyLike, { model: Comment, include: [commentLike, User] }]
    });
    return res.json({ story });
}));

module.exports = router;
