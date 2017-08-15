module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define("Transaction", {
    transaction_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ingredient: {
      type: DataTypes.STRING,
      allowNull: false
    },
    transaction_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    amount_changed: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    end_amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    }

  });

  return Transaction;
};