const express = require("express");
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Story, Comment, storyLike, commentLike, Category } = require('../../db/models');
const { Op } = require("sequelize");


const router = express.Router();

// HOMEPAGE
// GET stories
router.get('/', asyncHandler(async (req, res) => {
    const stories = await Story.findAll({
        order: [["id", "DESC"]],
        include: [Category]
    });
    return res.json({
        stories,
    });
}));

// GET stories by id
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const story = await Story.findByPk(id, {
        include: [User, Category, { model: Comment, include: [commentLike, User] }]
    });
    return res.json({ story });
}));

// GET categories
router.get('/category/:categories', asyncHandler(async (req, res) => {
    const { categories } = req.params;
    const categoriesList = await Category.findAll({
        where: {
            title: {
                [Op.iLike]: `${categories}%`
            }
        },
        limit: 10
    });
    return res.json({ categoriesList });
}));


// POST stories
router.post('/new', requireAuth, asyncHandler(async (req, res) => {
    const { title, recipe, ingredients, instructions, timeframe, image, category } = req.body;
    const userId = req.user.id;

    try {
        let findCategory = await Category.findOne({ where: { title: category } });

        if (!findCategory) {
            findCategory = await Category.create({
                title: category
            });
        }

        const newStory = await Story.create({
            title,
            recipe,
            ingredients,
            instructions,
            timeframe,
            image,
            userId,
            categoryId: findCategory.id
        });

        const story = await Story.findByPk(newStory.id, { include: [User, Category] });

        return res.json({ story });

    } catch (error) {
        res.status(500);
        res.send(`${error}`);
    }
}));

// PUT stories
router.put('/:id(\\d+)/rate', requireAuth, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;

    try {
        let storyRating = await storyLike.findOne({
            where: {
                storyId: id,
                userId
            }
        });

        if (!storyRating) {
            storyRating = await storyLike.create({
                userId,
                storyId: id,
                rating
            });
        } else {
            storyRating.rating = rating;
            await storyRating.save();
        }

        const story = await Story.findByPk(id, { include: [storyLike] });
        const parsedRatings = story.storyLikes.map((rateObj) => Number(rateObj.rating));
        const ratingSum = parsedRatings.reduce((prev, current) => prev + current);

        story.rating = (ratingSum / parsedRatings.length).toFixed(2);
        await story.save();

        return res.json({ rating: story.rating });
    } catch (error) {
        res.status(500);
        res.send(`${error}`);
    }
}));

// PATCH stories
router.patch('/edit/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const { id } = req.params;

    const { title, recipe, ingredients, instructions, timeframe, image, category } = req.body;

    try {
        const story = await Story.findByPk(id);
        let updated = false;
        let findCategory;
        if (category) {
            findCategory = await Category.findOne({ where: { title: category } });

            if (!findCategory) {
                findCategory = await Category.create({
                    title: category
                });
            }
            if (story && category && findCategory.id !== story.categoryId) {
                story.categoryId = findCategory.id;
                updated = true;
            }
        }
        if (story) {
            if (title && title !== story.title) {
                story.title = title;
                updated = true;
            }
            if (recipe && recipe !== story.recipe) {
                story.recipe = recipe;
                updated = true;
            }
            if (ingredients && ingredients !== story.ingredients) {
                story.ingredients = ingredients;
                updated = true;
            }
            if (instructions && instructions !== story.instructions) {
                story.instructions = instructions;
                updated = true;
            }
            if (timeframe && timeframe !== story.timeframe) {
                story.timeframe = timeframe;
                updated = true;
            }
            if (image && image !== story.image) {
                story.image = image;
                updated = true;
            }
        }
        if (updated) {
            story.updatedAt = new Date();
            await story.save();
        }
        const result = await Story.findByPk(story.id, {
            include: [Category]
        });
        return res.json({ result });
    } catch (error) {
        res.status(500);
        res.send(`${error}`);
    }
}));

// DELETE stories
router.delete('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    // console.log("STORIES delete route backend")
    try {
        const story = await Story.findByPk(id);
        if (userId !== story.userId) {
            res.status(401);
            return res.send("Unauthorized");
        }
        await story.destroy();
        return res.send("Success");
    } catch (error) {
        res.status(500);
        res.send(`${error}`);
    }
}));

module.exports = router;
