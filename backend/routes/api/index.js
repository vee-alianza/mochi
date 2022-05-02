const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const storiesRouter = require('./stories.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/stories', storiesRouter);


module.exports = router;
