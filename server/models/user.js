'use strict';
const { hashPassword } = require('../helpers');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 16],
          msg: 'Password must be longer than 8'
        }
      }
    },
    organization: {
      type: DataTypes.STRING,
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        const hashedPassword = hashPassword(user)
        user.password = hashedPassword
        user.organization = 'Hacktiv8'
      }
    }, sequelize
  });

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task)
  };
  return User;
};