//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Video = require('./models/Video')
const Order = require('./models/Order')
const OrderDetail = require('./models/OrderDetail')

//associations could go here!
<<<<<<< HEAD
console.log("git pull requ")
=======
console.log("This is me trying to refactor the code")
>>>>>>> f8eeb6f21f2c125da9d461ad269e6cd809c5593f

module.exports = {
  db,
  models: {
    User,
    Video,
    Order,
    OrderDetail
  },
}
