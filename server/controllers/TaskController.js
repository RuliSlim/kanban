const { Task, User, Category } = require('../models');

class TaskController {
  static getAll(req, res, next) {
    Task.findAll({ 
      where: {
        organization: req.user.organization
      },
      include: [{all: true}]
  })
      .then(tasks => {
        if(!tasks.length) return res.status(200).json({tasks: 'You dont have task yet.'});
        res.status(200).json(tasks);
      })
      .catch(err => next(err));
  }

  static create(req, res, next) {
    const { title, description, CategoryId } = req.body;
    const { organization, id } = req.user;
    // console.log(organization)
    Task.create({
      title, description, CategoryId, organization, UserId: id
    })
    .then(task => {
      res.status(201).json(task);
    })
    .catch(err => next(err));
  }

  static updateOne(req, res, next) {
    const { title, description, CategoryId, status } = req.body;
    const { organization } = req.user;
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
