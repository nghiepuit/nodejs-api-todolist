"use strict";
module.exports = (sequelize, DataTypes) => {
  var Directory = sequelize.define(
    "directories",
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
      path: {
        type: DataTypes.STRING,
        unique: true
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
      },
      parent: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
      }
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          Directory.hasMany(models.directory, {
            onDelete: "CASCADE",
            foreignKey: "parent",
            as: "children"
          });
          Directory.hasMany(models.media, {
            onDelete: "CASCADE",
            foreignKey: "directoryId",
            as: "listMedia"
          });
        }
      }
    }
  );
  return Directory;
};
