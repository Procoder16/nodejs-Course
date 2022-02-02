const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const OrderItem = sequelize.define('orderItem', {
    id: {
        primaryKey: true,
        type: Sequelize.NUMBER,
        autoIncrement: true,
        allowNull: false,
    },
    quantity: Sequelize.NUMBER,
});

module.exports = OrderItem;