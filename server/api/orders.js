const router = require("express").Router();
const { Order, OrderVideo } = require("../db/index");

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    //searches for open cart belonging to user
    const cart = await Order.findOne({
      where: { userId: req.params.userId, isCart: true },
    });

    //searches for videos belonging to open cart
    const cartVideos = await OrderVideo.findAll({
      where: { orderId: cart.orderId },
    });

    //returns an array of videos sharing the same cart
    res.json(cartVideos);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
