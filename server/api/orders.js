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

module.exports = router;
