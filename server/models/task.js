'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    CategoryId: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    organization: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    hooks: {
      beforeCreate : (task) => {
        task.status = false;
      }
    }
  });
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User);
    Task.belongsTo(models.Category);
  };
  return Task;
};

// ada organisasi