//this is the access point for all things database related!

const db = require('./db')
const Sequelize = require('sequelize')
const User = require('./models/User')
const Video = require('./models/Video')
const Order = require('./models/Order.js')

//associations could go here!
//Videos can be part of multiple orders
//order can have multiple videos
// Video.belongsToMany(OrderUser, { through: OrderVideo })
// OrderUser.belongsToMany(Video, { through: OrderVideo })

// //User can have multiple orders
// OrderUser.belongsTo(User);
// User.hasMany(OrderUser)

Video.belongsToMany(User, {
  through: {
    model: Order,
    unique: false,
  },
});
User.belongsToMany(Video, {
  through: {
    model: Order,
    unique: false,
  },
});

module.exports = {
  db,
  models: {
    User,
    Video,
    Order
  },
}
