const router = require("express").Router();
const { Order, OrderVideo, userUniqueVideo } = require("../db/index");
const {hasUserToken, isAdmin} = require("./gatekeepingMiddleware")

//only admin should be able to get all orders?
router.get("/", hasUserToken, isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// //single order assuming user is logged in => Pending on Takumi's code
// router.get("/:orderId", hasUserToken, async (req, res, next) => {
//   try {
//     const order = await Order.findOne({
//       where: { id: req.params.orderId },
//     });
//     res.json(order);
//   } catch (err) {
//     next(err);
//   }
// });

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
router.put("/:userId", async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: { userId: req.params.userId, isCart: true },
    });

    console.log(req.body);
    res.send(req.body);

    // const cartVideos = await OrderVideo.findOrCreate({
    //   where: { orderId: cart.orderId, videoId:  },
    // });
  } catch (error) {
    next(error);
  }
});

//checkout a cart
router.put("/:userId/checkout", async (req, res, next) => {
  try {
    let fulfilledId = await Order.checkOut(req.params.userId);

    //Find all ordervideos for past checkout
    const ordervideos = await OrderVideo.findAll({
      where: {
        orderId: fulfilledId,
      },
    });

    //Find or create user unique videos for user
    const [...videoAssignment] = await Promise.all(
      ordervideos.map((ordervideo) => ordervideo.videoId)
    );

    videoAssignment.map(async (videoId) => {
      await userUniqueVideo.findOrCreate({
        where: {
          videoId: videoId,
          userId: req.params.userId,
        },
      });
    });

    res.send("Added videos" + videoAssignment + " to User Account");
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
