const router = require('express').Router();
const { Video } = require('../db/index');

// GET /api/videos
router.get('/', async (req, res, next) => {
  try {
    const videos = await Video.findAll();
    res.json(videos);
  } catch (err) {
    next(err);
  }
});

<<<<<<< HEAD
router.get("/:videoId", async (req, res, next) => {
  try {
    const video = await Video.findOne({
      where: { id: req.params.videoId },
    });
    res.send(video);
  } catch (error) {
    next(error);
=======
// GET /api/videos/videoId
router.get('/:videoId', async (req, res, next) => {
  try {
    const video = await Video.findOne({
      where: {
        id: req.params.videoId,
      },
    });
    res.json(video);
  } catch (err) {
    next(err);
>>>>>>> 05d4e3fecbbf8732975ae9fa4c068f9380c97ca5
  }
});

module.exports = router;
