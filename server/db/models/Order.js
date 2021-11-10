const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const axios = require('axios');

const SALT_ROUNDS = 5;

const Order = db.define('order', {
    paymentDate:{
        type: Sequelize.STRING,
        allowNull: false
    }
})


module.exports = Order