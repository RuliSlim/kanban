const { Task, User, Category } = require('../models');

class TaskController {
  static getAll(req, res, next) {
    let foundCat;
    console.log(req.headers);
    Category.findAll({ 
      include: [
        {
          model: Task,
          // where: {
          //   organization: req.user.organization
          // },
          // attributes: [''],
          include: [{model: User, attributes: ['username', 'organization']}]
        }
      ], 
      attributes: ['id', 'name'],
  })  
      .then(cats => {
        foundCat = cats;
        if(!cats.length) return res.status(200).json({tasks: 'You dont have task yet.'});
        return Task.findAll({where: { organization: req.user.organization }});
      })
      .then(tasks => {
        res.status(200).json({cats: foundCat, tasks});
      })
      .catch(err => next(err));
  }

  static create(req, res, next) {
    const { title, description, CategoryId } = req.body;
    const { organization, id, username } = req.user;
    Task.create({
      title, description, CategoryId, organization, UserId: id
    })
    .then(task => {
      console.log(task)
      res.status(201).json({task, user: {username, organization}});
    })
    .catch(err => next(err));
  }

  static updateOne(req, res, next) {
    const { title, description, CategoryId, status } = req.body;
    const { organization } = req.user;
    console.log('masuk sini ga?')
    console.log(req.body)
    Task.findByPk(req.params.id)
      .then(task => {
        if(!task) throw new Error('Task not found');
        return Task.update({ 
          title, description, CategoryId, organization, status 
        }, { 
          where: { id: req.params.id },
          returning: true
        });
      })
      .then(task => res.status(200).json(task))
      .catch(err => next(err));
  }

  static deleteOne(req, res, next) {
    let deletedTask;
    Task.findByPk(req.params.id)
      .then(task => {
        if(!task) throw new Error('Task not found');
        deletedTask = task
        return Task.destroy({where: {id: req.params.id}});
      })
      .then(task => res.status(200).json(deletedTask))
      .catch(err => next(err));
  }
}

module.exports = TaskController
