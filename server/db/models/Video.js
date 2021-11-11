const Sequelize = require('sequelize')
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const axios = require('axios');

const SALT_ROUNDS = 5;

const Video = db.define('video', {
    title:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
          }
    },
    price:{
        type: Sequelize.INTEGER,
        // allowNull: false,
        // validate: {
        // notEmpty: true
        // }
    },
    unitsInStock:{
        type: Sequelize.INTEGER,

    },
    authorName:{
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.TEXT,
        // allowNull: false,
        // validate: {
        //   notEmpty: true
        // }
      },
    imageURL :{
        type: Sequelize.STRING,
        // allowNull: false,
        // validate: {
        //     notEmpty: true
        //   }
    }  

})

module.exports = Video