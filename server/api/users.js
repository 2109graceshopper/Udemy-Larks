const router = require("express").Router();
const { User, Order } = require("../db/index");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: Order,
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
