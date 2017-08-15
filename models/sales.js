module.exports = function(sequelize, DataTypes) {
  var Sales = sequelize.define("Sales", {
    sale_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    item_sold: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total_sales_units: {
      type: DataTypes.INTEGER
    },
    ingredient_one: {
      type: DataTypes.STRING
    },
    amount_one_start: {
      type: DataTypes.FLOAT
    },
    amount_one_deducted: {
      type: DataTypes.FLOAT
    },
    amount_one_end: {
      type: DataTypes.FLOAT
    },
    ingredient_two: {
      type: DataTypes.STRING
    },
    amount_two_start: {
      type: DataTypes.FLOAT
    },
    amount_two_deducted: {
      type: DataTypes.FLOAT
    },
    amount_two_end: {
      type: DataTypes.FLOAT
    },
    ingredient_three: {
      type: DataTypes.STRING
    },
    amount_three_start: {
      type: DataTypes.FLOAT
    },
    amount_three_deducted: {
      type: DataTypes.FLOAT
    },
    amount_three_end: {
      type: DataTypes.FLOAT
    },
    ingredient_four: {
      type: DataTypes.STRING
    },
    amount_four_start: {
      type: DataTypes.FLOAT
    },
    amount_four_deducted: {
      type: DataTypes.FLOAT
    },
    amount_four_end: {
      type: DataTypes.FLOAT
    },
    ingredient_five: {
      type: DataTypes.STRING
    },
    amount_five_start: {
      type: DataTypes.FLOAT
    },
    amount_five_deducted: {
      type: DataTypes.FLOAT
    },
    amount_five_end: {
      type: DataTypes.FLOAT
    },
    ingredient_six: {
      type: DataTypes.STRING
    },
    amount_six_start: {
      type: DataTypes.FLOAT
    },
    amount_six_deducted: {
      type: DataTypes.FLOAT
    },
    amount_six_end: {
      type: DataTypes.FLOAT
    },
  });

  return Sales;
};