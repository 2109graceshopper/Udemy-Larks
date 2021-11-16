const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");
const Order = require("./Order");

const SALT_ROUNDS = 5;

const User = db.define("user", {
  username: {
    //also email
    type: Sequelize.STRING,
    unique: true,
    //allowNull: false
  },
  password: {
    type: Sequelize.STRING,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  address: {
    //billing and shipping
    type: Sequelize.STRING,
  },
  creditcard: {
    //hash later?
    type: Sequelize.INTEGER,
  },
  userimageURL: {
    type: Sequelize.STRING,
  },
  isAdmin: {
    // This is for special users
    type: Sequelize.BOOLEAN,
    default: false,
  },
});

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    if (!user) {
      throw "nooo";
    }
    return user;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));

const createOrderForNewUser = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  await Order.create({
    userId: user.id,
    isCart: true,
  });
};

User.afterCreate(createOrderForNewUser);
User.afterBulkCreate(createOrderForNewUser);

module.exports = User;
