module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ingredient_one: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity_one: {
      type: DataTypes.FLOAT
    },
    ingredient_two: {
      type: DataTypes.STRING
    },
    quantity_two: {
      type: DataTypes.FLOAT
    },
    ingredient_three: {
      type: DataTypes.STRING
    },
    quantity_three: {
      type: DataTypes.FLOAT
    },
    ingredient_four: {
      type: DataTypes.STRING
    },
    quantity_four: {
      type: DataTypes.FLOAT
    },
    ingredient_five: {
      type: DataTypes.STRING
    },
    quantity_five: {
      type: DataTypes.FLOAT
    },
    ingredient_six: {
      type: DataTypes.STRING
    },
    quantity_six: {
      type: DataTypes.FLOAT
    },
  },
  {
    timestamps: false
  });

  return Recipe;
};