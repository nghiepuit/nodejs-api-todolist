"use strict";
module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define(
    "tasks",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        unique: true
      },
      description: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      order: {
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
      hooks: {
        /**
         * Get max order & set order auto increament
         */
        beforeCreate: (task, options, cb) => {
          Task.findOne({
            attributes: [
              [sequelize.fn("MAX", sequelize.col("order")), "order"]
            ],
            raw: true
          }).then(data => {
            if (data && data.order && !isNaN(data.order)) {
              const max = data.order + 1;
              task.order = max;
            } else {
              task.order = 1;
            }
            return cb(null, options);
          });
        }
      },
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  return Task;
};
