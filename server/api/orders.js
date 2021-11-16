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

//getting a user's saved cart
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

//updating a user's saved cart (merging w/ localstorage cart)
router.post("/:userId", async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: { userId: req.params.userId, isCart: true },
    });

    const cartVideos = await OrderVideo.findAll({
      where: { orderId: cart.orderId },
    });
  } catch (error) {
    next(error);
  }
});

//checkout a cart
router.put("/:userId", async (req, res, next) => {
  try {
    res.json(Order.checkout(req.params.userId));
  } catch (error) {
    next(error);
  }
});

//removing an item from a user's cart
router.delete("/:userId/:videoId", async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: { userId: req.params.userId, isCart: true },
    });

    const videoToRemove = await OrderVideo.findOne({
      where: { orderId: cart.orderId, videoId: req.params.videoId },
    });

    await videoToRemove.destroy();
    res.send(videoToRemove);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
