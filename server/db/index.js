//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Video = require('./models/Video')
const Order = require('./models/Order')
const OrderDetail = require('./models/OrderDetail')

//associations could go here!
//Videos can be part of multiple orders
//order can have multiple videos
Video.belongsToMany(Order, { through: OrderDetail })
Order.belongsToMany(Video, { through: OrderDetail })

//User can have multiple orders
Order.belongsTo(User);
User.hasMany(Order)

module.exports = {
  db,
  models: {
    User,
    Video,
    Order,
    OrderDetail
  },
}
