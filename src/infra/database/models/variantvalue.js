"use strict";
module.exports = (sequelize, DataTypes) => {
  var VariantValue = sequelize.define(
    "variantValues",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      variantId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      value: {
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
          VariantValue.belongsTo(models.variant, {
            foreignKey: "variantId",
            as: "variant"
          });
        }
      }
    }
  );
  return VariantValue;
};
