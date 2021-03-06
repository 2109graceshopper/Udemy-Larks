const router = require("express").Router();

router.use("/orders", require("./orders"));
router.use("/videos", require("./videos"));
router.use('/users', require('./users'))

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
