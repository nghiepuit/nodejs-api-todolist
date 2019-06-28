"use strict";
module.exports = (sequelize, DataTypes) => {
  var ProductVariant = sequelize.define(
    "productvariants",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      productId: {
        type: DataTypes.UUID,
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
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      promotionPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
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
          ProductVariant.belongsTo(models.product, {
            foreignKey: "productId",
            as: "product"
          });
          ProductVariant.belongsTo(models.variant, {
            foreignKey: "variantId",
            as: "variant"
          });
          ProductVariant.belongsTo(models.variantvalue, {
            foreignKey: "variantValueId",
            as: "variantValue"
          });
          ProductVariant.hasMany(models.productmedia, {
            foreignKey: "productVariantId",
            as: "listProductMedia"
          });
        }
      }
    }
  );
  return ProductVariant;
};
