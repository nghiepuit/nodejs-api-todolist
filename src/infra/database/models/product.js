"use strict";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define(
    "products",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      description: {
        type: DataTypes.STRING
      },
      hot: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      sale: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      new: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
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
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          Product.belongsTo(models.category, {
            foreignKey: "categoryId",
            as: "category"
          });
          Product.hasMany(models.productsku, {
            foreignKey: "productId",
            as: "productSkus"
          });
        }
      },
      hooks: {
        /**
         * Get max order & set order auto increament
         */
        beforeCreate: (product, options, cb) => {
          product.slug = slugify(product.name);
        }
      }
    }
  );
  return Product;
};
