const router = require("express").Router();
const { User } = require("../db");

router.post("/login", async (req, res, next) => {
  console.log("Here!");
  try {
    const token = await User.authenticate(req.body);
    console.log(token);
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});
//todo need way to populate other fiields
router.post("/signup", async (req, res, next) => {
  try {
    //only take in username and password fields ignore everything else
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
