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
  var Category = sequelize.define(
    "categories",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      parent: DataTypes.INTEGER,
      name: {
        type: DataTypes.STRING
      },
      slug: {
        type: DataTypes.STRING
      },
      isDeleted: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      image: DataTypes.STRING,
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
      hooks: {
        beforeCreate: category => {
          category.slug = slugify(category.name);
        }
      }
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          Category.hasMany(models.Category, {
            onDelete: "CASCADE",
            foreignKey: "parent",
            as: "children"
          });
        }
      }
    }
  );
  return Category;
};
