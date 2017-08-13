module.exports = function(sequelize, DataTypes) {
  var Sales = sequelize.define("Sales", {
    item_sold: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total_sales_units: {
      type: DataTypes.INTEGER
    }
  });

  return Sales;
};