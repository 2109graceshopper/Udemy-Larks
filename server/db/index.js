//this is the access point for all things database related!

const db = require("./db");
const User = require("./models/User");
const Video = require("./models/Video");
const Order = require("./models/Order");
const { Sequelize } = require("sequelize");
const { findAllVideos } = require("./models/Video");

//associations could go here!

//User have many Orders
User.hasMany(Order);

//User Owned Videos
const UserOwnedVideo = db.define("userownedvideo", {}, { timestamps: false });

Video.belongsToMany(User, {
  through: {
    model: UserOwnedVideo,
  },
});

Video.hasMany(UserOwnedVideo);

//Videos Belong To Many Orders via OrderVideo
const OrderVideo = db.define(
  "ordervideo",
  {
    qty: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
  },
  { timestamps: false }
);

Video.belongsToMany(Order, { through: OrderVideo, otherKey: "orderId" });
Video.hasMany(OrderVideo);

module.exports = {
  db,
  User,
  Video,
  Order,
  OrderVideo,
  UserOwnedVideo,
};
