"use strict";
module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define(
    "roles",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
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
          // based on file name: user.js => model.user
          Role.belongsToMany(models.users, {
            through: "userRoles",
            foreignKey: "roleId",
            as: "users"
          });
          Role.belongsToMany(models.permission, {
            through: "rolePermissions",
            foreignKey: "roleId",
            as: "permissions"
          });
        }
      }
    }
  );
  return Role;
};
