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

router.get("/:videoId", async (req, res, next) => {
  try {
    const video = await Video.findOne({
      where: { id: req.params.videoId },
    });
    res.send(video);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
