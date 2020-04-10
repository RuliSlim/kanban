const { Task, User, Category } = require('../models');

class CategoryController {
  static getAll(req, res, next) {
    let foundCat;
    console.log(req.headers);
    Category.findAll()
      .then(cats => {
        res.status(200).json(cats);
      })
      .catch(err => next(err));
  }
}

module.exports = CategoryController;
