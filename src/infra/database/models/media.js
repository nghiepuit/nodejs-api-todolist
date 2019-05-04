"use strict";
module.exports = (sequelize, DataTypes) => {
  var Media = sequelize.define(
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
      extension: {
        type: DataTypes.STRING
      },
      directoryId: {
        type: DataTypes.INTEGER
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
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          Media.belongsTo(models.directory, {
            foreignKey: "directoryId",
            as: "directory"
          });
        }
      }
    }
  );
  return Media;
};
