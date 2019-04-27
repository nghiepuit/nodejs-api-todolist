"use strict";
module.exports = (sequelize, DataTypes) => {
  var rolePermission = sequelize.define(
    "rolePermission",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
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
  return rolePermission;
};
