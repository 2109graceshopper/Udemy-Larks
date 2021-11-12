const router = require("express").Router();
const { Video } = require("../db/index");

router.get("/", async (req, res, next) => {
  try {
    const videos = await Video.findAll();
    res.json(videos);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
