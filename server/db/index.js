//this is the access point for all things database related!

const db = require("./db");
const User = require("./models/User");
const Video = require("./models/Video");
// const Order = require("./models/Order");
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
const UserOwnedVideo = db.define("userownedvideos", {}, { timestamps: false });
Video.belongsToMany(User, {
  through: {
    model: UserOwnedVideo,
  },
});
User.hasMany(UserOwnedVideo);

//User has Orders
const Order = db.define(
  "order",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    isCart: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false }
);

User.hasMany(Order);

//Orders have multiple videos
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

//Users have multiple videos in their cart


module.exports = {
  db,
  User,
  Video,
  Order,
  OrderVideo,
  UserOwnedVideo,
};
