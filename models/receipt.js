module.exports = function(sequelize, DataTypes) {
  var Receipt = sequelize.define("Receipt", {
    ingredient: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.FLOAT
    }
  });
  
  return Receipt;
};