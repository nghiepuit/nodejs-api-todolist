"use strict";
module.exports = (sequelize, DataTypes) => {
  var media = sequelize.define(
    "media",
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
      originalFilename: {
        type: DataTypes.STRING
      },
      src: {
        type: DataTypes.STRING
      },
      path: {
        type: DataTypes.STRING
      },
      size: {
        type: DataTypes.STRING
      },
      type: {
        type: DataTypes.STRING
      },
      createdBy: {
        type: DataTypes.UUID
      },
      updatedBy: {
        type: DataTypes.UUID
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
  return media;
};
