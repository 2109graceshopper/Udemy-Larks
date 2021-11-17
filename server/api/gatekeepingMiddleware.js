//Security middleware
const { User } = require("../db/index");

//check if valid user made request
const hasUserToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    if (!user) throw error;
    //valid user continue
    req.user = user;
    next();
  } catch (error) {
    console.log("Not a valid user token");
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("Not an admin");
  } else {
    //found admin move on
    next();
  }
};

module.exports = {
  hasUserToken,
  isAdmin,
};
