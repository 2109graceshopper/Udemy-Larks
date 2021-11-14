//this is the access point for all things database related!

const db = require("./db");
const User = require("./models/User");
const Video = require("./models/Video");
const Order = require("./models/Order");
const { Sequelize } = require("sequelize");
const { findAllVideos } = require("./models/Video");

//associations could go here!
//Videos can be part of multiple orders
//order can have multiple videos
// Video.belongsToMany(OrderUser, { through: OrderVideo })
// OrderUser.belongsToMany(Video, { through: OrderVideo })

// //User can have multiple orders
// OrderUser.belongsTo(User);
// User.hasMany(OrderUser)

//User Owned Videos
const UserOwnedVideo = db.define("userownedvideo", {}, { timestamps: false });

Video.belongsToMany(User, {
  through: {
    model: UserOwnedVideo,
  },
});

User.hasMany(UserOwnedVideo);

//User has Orders
User.hasMany(Order);

//Orders have many videos
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

Video.belongsToMany(Order, {
  through: { model: OrderVideo },
});

//Users have many ordervideo
User.hasMany(OrderVideo);

module.exports = {
  db,
  User,
  Video,
  Order,
  OrderVideo,
  UserOwnedVideo,
};
