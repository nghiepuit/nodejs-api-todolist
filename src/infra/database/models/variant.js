"use strict";
module.exports = (sequelize, DataTypes) => {
  var Variant = sequelize.define(
    "variants",
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
          Variant.hasMany(models.variantvalue, {
            onDelete: "CASCADE",
            foreignKey: "variantId",
            as: "variantValues"
          });
        }
      }
    }
  );
  return Variant;
};
