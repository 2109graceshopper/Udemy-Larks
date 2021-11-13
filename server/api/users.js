const router = require('express').Router();
const { User, Video } = require('../db/index');

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
    // DB query to updated once DB design is updated
    const user = await User.findAll({
      where: {
        id: req.params.userId,
      },
      include: Video,
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
