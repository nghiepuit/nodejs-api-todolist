"use strict";
module.exports = (sequelize, DataTypes) => {
  var userRole = sequelize.define(
    "userRoles",
    {
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
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
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  return userRole;
};
