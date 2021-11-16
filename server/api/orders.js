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

//checkout a cart
router.put("/:userId", async (req, res, next) => {
  try {
    //search for open cart belonging to user
    const cart = await Order.findOne({
      where: { userId: req.params.userId, isCart: true },
    });
    //send update (to change isCart to false)
    await cart.update({ isCart: false });

    //create a new active cart
    res.send(await Order.create({ userId: req.params.userId, isCart: true }));
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

//2 paths
// router.put - checkout. Set isCart to false, create new cart

module.exports = router;
