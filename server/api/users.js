const router = require('express').Router();
const {
  User,
  Video,
  Order,
  OrderVideo,
  userUniqueVideo,
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

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.id,
        isCart: true,
      },
    });

    const { orderId } = order;

    const videos = await Video.findAll({
      include: {
        model: OrderVideo,
        where: {
          orderId: orderId,
        },
      },
    });

    let user = await User.findByPk(req.params.id);
    user = { ...user, shoppingCart: videos };
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
