const router = require("express").Router();
const {
  User,
  OrderVideo,
  Order,
  UserOwnedVideo,
  Video,
} = require("../db/index");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

/*

- Finding Shopping Cart Items for a given user?
const user = await User.findOne({
      where: { id: req.params.id },
      include: {
        model: Order,
        where: {
          isCart: true
        }
      },
    });
    const orderid = user.orders[0].id;
    const ordervideos = await OrderVideo.findAll({
      where: { orderId: orderid }
    })
    res.json(ordervideos);


  - Finding Vidos that a User owns?
  const user = await User.findOne({
      where: { id: req.params.id },
      include: {
        model: UserOwnedVideo,
      },
    });
    res.json(user);

*/

router.get("/:id", async (req, res, next) => {
  try {
    // const videos = await Video.findAll({
    //   include: {
    //     model: Order,
    //     where: {
    //       isCart: true,
    //     },
    //   },
    // });

    const user = await User.findOne({
      where: { id: req.params.id },
      include: {
        model: Video,
        include: {
          model: Order,
          where: {
            isCart: true,
          },
        },
      },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
