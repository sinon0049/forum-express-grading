const db = require('../models')
const Restaurant = db.Restaurant
const User = db.User
const Category = db.Category


const categoryService = {
    getCategories: (req, res, callback) => {
        return Category.findAll({ raw: true, nest: true})
            .then(categories => {
                if(req.params.id) {
                    Category.findByPk(req.params.id)
                        .then(category => {
                            callback({ categories, category: category.toJSON() })
                        })
                } else {
                    callback({ categories })
                }
            })
    },

    postCategory: (req, res, callback) => {
        if(!req.body.name) {
            callback({status: 'error', message: "name didn't exist"})
        } else {
            return Category.create({
                name: req.body.name
            }).then(() => {
                callback({status: 'success', message: "category created successfully"})
            })
        }
    },

    putCategory: (req, res, callback) => {
        if(!req.body.name) {
            callback({status: 'error', message: "name didn't exist"})
        } else {
            return Category.findByPk(req.params.id)
            .then(category => {
                category.update(req.body)
                    .then(() => {
                        callback({status: 'success', message: "category updated successfully"})
                    })
            })
        }
    },
}

module.exports = categoryService