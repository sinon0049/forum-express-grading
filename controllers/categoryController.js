const db = require('../models')
const Category = db.Category

const categoryController = {
    getCategories: (req, res) => {
        return Category.findAll({ raw: true, nest: true})
            .then(categories => {
                return res.render('admin/categories', { categories })
            })
    },
    postCategory: (req, res) => {
        if(!req.body.name) {
            req.flash('error_messages', 'please insert name')
            return res.redirect('back')
        } else {
            return Category.create({
                name: req.body.name
            }).then(() => {
                res.redirect('/admin/categories')
            })
        }
    },
    putCategory: {},
    deleteCategory: {},
}

module.exports = categoryController