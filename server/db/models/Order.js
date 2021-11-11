const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const axios = require('axios');

const SALT_ROUNDS = 5;

const Order = db.define(
    "order",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      quantity :{
      type: Sequelize.INTEGER,
      },
    },
    { timestamps: true }
  );

Order.addVideoToOrder = async(videoID, userID) =>{

}
  


  module.exports = Order