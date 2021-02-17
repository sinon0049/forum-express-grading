const db = require('../models')
const Restaurant = db.Restaurant
const User = db.User
const Category = db.Category
const fs = require('fs')
const imgur = require('imgur')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const adminService = {
    getRestaurants: (req, res, callback) => {
      return Restaurant.findAll({
        raw: true,
        nest: true,
        include: [Category]
      }).then(restaurants => {
        callback({restaurants: restaurants})
      })
    },

    getRestaurant: (req, res, callback) => {
        return Restaurant.findByPk(req.params.id, { include: [Category] }).then(restaurant => {
          callback({restaurant: restaurant})
        })
    },

    deleteRestaurant: (req, res, callback) => {
      return Restaurant.findByPk(req.params.id)
        .then((restaurant) => {
          restaurant.destroy()
            .then((restaurant) => {
              callback({ status: 'success', message: '' })
            })
        })
    },

    postRestaurant: (req, res, callback) => {
      if (!req.body.name) {
        return callback({ status: 'error', message: "name didn't exist" })
      }
      const { file } = req // equal to const file = req.file
      if (file) {
        imgur.setClientId(IMGUR_CLIENT_ID)
        imgur.uploadFile(file.path)
          .then(file => {
            return Restaurant.create({
              name: req.body.name,
              tel: req.body.tel,
              address: req.body.address,
              opening_hours: req.body.opening_hours,
              description: req.body.description,
              image: file ? file.data.link : null,
              CategoryId: req.body.categoryId
            })
          }).then((restaurant) => {
            callback({ status: 'success', message: 'restaurant was successfully created' })
          })
      } else {
        return Restaurant.create({
          name: req.body.name,
          tel: req.body.tel,
          address: req.body.address,
          opening_hours: req.body.opening_hours,
          description: req.body.description,
          CategoryId: req.body.categoryId
        })
          .then((restaurant) => {
            callback({ status: 'success', message: 'restaurant was successfully created' })
          })
      }
    },
}

module.exports = adminService