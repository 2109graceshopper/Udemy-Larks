//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Video = require('./models/Video')
const Order = require('./models/Order')
const OrderDetail = require('./models/OrderDetail')

//associations could go here!
console.log("git pull requ")

module.exports = {
  db,
  models: {
    User,
    Video,
    Order,
    OrderDetail
  },
}
