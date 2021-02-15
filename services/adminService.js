const db = require('../models')
const Restaurant = db.Restaurant
const User = db.User
const Category = db.Category
const fs = require('fs')
const imgur = require('imgur-node-api')
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
            /*return res.render('admin/restaurant', {
            restaurant: restaurant.toJSON()
          })*/
        })
    },
}

module.exports = adminService