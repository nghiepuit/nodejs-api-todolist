"use strict";
module.exports = (sequelize, DataTypes) => {
  var rolePermission = sequelize.define(
    "rolePermission",
    {
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      permissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
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
