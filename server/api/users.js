const router = require("express").Router();
const {
  User,
  Video,
  Order,
  OrderVideo,
  userUniqueVideo,
} = require("../db/index");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes:['id', 'username'] //returning only needed data from users safer!
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

/*
  // Shopping Cart of videos for some given user
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

  - Finding Videos that a User owns?
    const videos = await Video.findAll({
      include: {
        model: UserOwnedVideo,
        where: {
          userId: req.params.id,
        }
      }
    });
    let user = await User.findByPk(req.params.id);
    user = {...user, videos: videos};
    res.json(user);
*/

router.get("/:id", async (req, res, next) => {
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
    //passing only data that is need for compnent rendering.
    let user = await User.findByPk(req.params.id);
    let safeUserData = {'id': user.dataValues.id, 'username': user.dataValues.username, 'firstName':  user.dataValues.firstName, 'lastName':  user.dataValues.lastName, 'address':  user.dataValues.address, 'userimageURL':  user.dataValues.userimageURL,}
    user = { ...safeUserData, shoppingCart: videos };
    
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
