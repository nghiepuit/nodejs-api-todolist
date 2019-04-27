"use strict";
const { encryptPassword } = require("../../encryption");

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
        type: DataTypes.STRING
      },
      middleName: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      verificationCode: {
        type: DataTypes.STRING,
        defaultValue: 0
      },
      isVerified: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      isDeleted: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      createdBy: {
        type: DataTypes.UUID
      },
      updatedBy: {
        type: DataTypes.UUID
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      hooks: {
        beforeCreate: user => {
          user.password = encryptPassword(user.password);
        }
      },
      classMethods: {
        associate(models) {
          // associations can be defined here
          // based on file name: role.js => model.role
          User.belongsToMany(models.role, {
            through: "userRoles",
            foreignKey: "userId",
            as: "roles"
          });
        }
      }
    }
  );

  return User;
};
