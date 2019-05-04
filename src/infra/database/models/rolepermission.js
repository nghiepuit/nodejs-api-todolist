"use strict";
module.exports = (sequelize, DataTypes) => {
  var rolePermission = sequelize.define(
    "rolePermissions",
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
  return rolePermission;
};
