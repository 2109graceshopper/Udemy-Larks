//Security middleware
const { User } = require('../db/index');

//check if valid user made request
const hasUserToken = async (req, res, next) => {
  console.log('THIS IS THE HEADER: ', req.headers);
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    if (!user) throw error;
    //valid user continue
    req.user = user;
    next();
  } catch (error) {
    console.log('Not a valid user token');
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send('Not an admin');
  } else {
    //found admin move on
    next();
  }
};

const isLoggedInUser = (req, res, next) => {
  //check if the user is only going to their page
  if (req.user.id != req.params.id) {
    if (!req.user.isAdmin) return res.status(403).send('Not for your eyes!');
  } else {
    next();
  }
};

module.exports = {
  hasUserToken,
  isAdmin,
  isLoggedInUser,
};
