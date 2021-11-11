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
    { isCart: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    },
    { timestamps: true }
  );

Order.addVideoToOrder = async(videoID, userID, Qty) =>{
    try{
        await this.create({
            videoID: videoID,
            userID: userID,
            quantity: Qty,
        })
    }catch(err){
        console.log("Adding to cart error")
    }
}
//use isCart to checkout
Order.checkOut = async(id) =>{
    try{
        await this.update({
            isCart: true,
            where: {id: id}
        })
    }catch(err){
        console.log("Error Checking Out")
    }
}

  module.exports = Order