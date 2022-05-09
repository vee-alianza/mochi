const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, storyLike, commentLike, Comment, Story, Bookmark } = require('../../db/models');

const router = express.Router();

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

// Log in
router.post(
    '/',
    validateLogin,
    asyncHandler(async (req, res, next) => {
        const { credential, password } = req.body;

        const user = await User.login({ credential, password });

        if (!user) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = ['The provided credentials were invalid.'];
            return next(err);
        }

        await setTokenCookie(res, user);

        return res.json({
            user
        });
    })
);

// Log in
router.post(
    '/demo-login',
    asyncHandler(async (req, res, next) => {
        const credential = 'Demo-lition';
        const password = 'password';
        const user = await User.login({ credential, password });

        if (!user) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = ['The provided credentials were invalid.'];
            return next(err);
        }

        await setTokenCookie(res, user);

        return res.json({
            user
        });
    })
);

// Log out
router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

// Restore session user
router.get(
    '/',
    restoreUser,
    (req, res) => {
        const { user } = req;
        if (user) {
            return res.json({
                user: user.toSafeObject()
            });
        } else return res.json({});
    }
);

router.get(
    '/story/:storyId(\\d+)',
    requireAuth,
    asyncHandler(async (req, res) => {
        const { storyId } = req.params;
        const userId = req.user.id;
        const ratingObj = await storyLike.findOne({
            where: {
                storyId,
                userId
            }
        });
        const commentLikes = await commentLike.findAll({
            include: [{
                model: Comment,
                attributes: [],
                include: [{
                    model: Story,
                    attributes: [],
                    where: { id: storyId }
                }]
            }],
            where: {
                userId
            }
        });
        const bookmarkedStory = await Bookmark.findOne({
            where: {
                userId,
                storyId
            }
        });

        if (ratingObj) {
            return res.json({ rating: ratingObj.rating, userCommentLikes: commentLikes, isBookmarked: !!bookmarkedStory });
        } else return res.json({ rating: "0", userCommentLikes: commentLikes, isBookmarked: !!bookmarkedStory });
    })
);

module.exports = router;
