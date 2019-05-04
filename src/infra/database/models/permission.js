"use strict";
module.exports = (sequelize, DataTypes) => {
  var permission = sequelize.define(
    "permissions",
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
          permission.belongsToMany(models.role, {
            through: "rolePermissions",
            foreignKey: "permissionId",
            as: "roles"
          });
        }
      }
    }
  );
  return permission;
};
