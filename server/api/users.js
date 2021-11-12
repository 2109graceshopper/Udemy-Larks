const router = require("express").Router();
const { User } = require("../db/index");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
