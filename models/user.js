const { DataTypes } = require("sequelize");
const sequelize = require("../database/index");
const todo = require("./todo");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

User.hasMany(todo, {
    foreignKey: {
        type: DataTypes.UUID,
        allowNull: false,
    },
});

todo.belongsTo(User);

module.exports = User;
