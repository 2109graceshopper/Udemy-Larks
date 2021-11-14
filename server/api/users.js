const router = require('express').Router();
const { User, OrderVideo, Order, UserOwnedVideo } = require('../db/index');

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/userId
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.userId },
      include: {
        model: UserOwnedVideo,
      },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
