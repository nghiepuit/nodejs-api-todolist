"use strict";
module.exports = (sequelize, DataTypes) => {
  var ProductMedia = sequelize.define(
    "productmedia",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      productVariantId: {
        type: DataTypes.INTEGER
      },
      mediaId: {
        type: DataTypes.INTEGER
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
          ProductMedia.belongsTo(models.productvariant, {
            foreignKey: "productVariantId",
            as: "productVariant"
          });
          ProductMedia.belongsTo(models.media, {
            foreignKey: "mediaId",
            as: "media"
          });
        }
      }
    }
  );
  return ProductMedia;
};
