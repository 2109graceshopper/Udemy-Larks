const router = require('express').Router();
const {
  User,
  Video,
  Order,
  OrderVideo,
  ShoppingCart,
  UserOwnedVideo,
} = require('../db/index');

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
    const videos = await Video.findAll({
      include: {
        model: UserOwnedVideo,
        where: {
          userId: req.params.userId,
        },
      },
    });
    let user = await User.findOne({
      where: { id: req.params.userId },
    });
    user = { ...user, videos: videos };
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
