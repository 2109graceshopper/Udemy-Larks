const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const axios = require('axios');

const SALT_ROUNDS = 5;

const OrderDetail = db.define('orderdetail', {
    quantity:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = OrderDetail