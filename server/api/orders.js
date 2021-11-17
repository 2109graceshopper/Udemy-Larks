const router = require("express").Router();
const { Order } = require("../db/index");
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

//single order assuming user is logged in
router.get("/:orderId", hasUserToken, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.orderId },
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});


module.exports = router;
