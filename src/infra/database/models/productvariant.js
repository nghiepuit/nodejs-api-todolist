"use strict";
module.exports = (sequelize, DataTypes) => {
  var ProductVariant = sequelize.define(
    "productVariants",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      productId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      variantId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      variantValueId: {
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
  return ProductVariant;
};
