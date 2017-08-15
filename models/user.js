module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    main_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    transaction_counter: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});
    return User;
};