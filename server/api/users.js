const router = require('express').Router();
const {
  User,
  Video,
  Order,
  OrderVideo,
  userUniqueVideo,
} = require('../db/index');
const { hasUserToken, isAdmin, isLoggedInUser } = require('./gatekeepingMiddleware');

router.get('/', hasUserToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username'], //returning only needed data from users safer! even with admin
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', hasUserToken,isLoggedInUser, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.id,
        isCart: true,
      },
    });
    let videos = [];
    if (order) {
      videos = await Video.findAll({
        include: {
          model: OrderVideo,
          where: {
            orderId: order.orderId,
          },
        },
      });
    }

    const userVideos = await Video.findAll({
      include: {
        model: userUniqueVideo,
        where: {
          userId: req.params.id,
        },
      },
    });

    // const userHasVideo = userVideos ? userVideos : [];

    //passing only data that is need for compnent rendering.
    let user = await User.findByPk(req.params.id);
    let safeUserData = {
      id: user.dataValues.id,
      username: user.dataValues.username,
      firstName: user.dataValues.firstName,
      lastName: user.dataValues.lastName,
      address: user.dataValues.address,
      userimageURL: user.dataValues.userimageURL,
    };
    user = {
      ...safeUserData,
      shoppingCart: videos,
      userUniqueVideos: userVideos,
    };

    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
