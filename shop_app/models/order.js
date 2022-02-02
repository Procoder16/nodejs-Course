const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Order = sequelize.define('order', {
    id: {
        primaryKey: true,
        type: Sequelize.NUMBER,
        autoIncrement: true,
        allowNull: false,
    }
});

module.exports = Order;