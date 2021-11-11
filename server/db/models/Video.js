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

//find all videos

Video.findAllVideos = async function(){
    let result = await this.findALL()
    return result; //Will get an array of objects that needs to be cleaned p;
}
//get a specific video
Video.findOneVideo = async function(id){
    let result = await this.findALL({
        where: {
            videoId: {[Sequelize.Op.eq]: id}
          }
    })
    return result;
}

//get all videos by an author
Video.findAuthorVideos = async function(author){
    let result = await this.findALL({
        where: {
            authorName: {[Sequelize.Op.eq]: author}
          }
    })
    return result
}

module.exports = Video