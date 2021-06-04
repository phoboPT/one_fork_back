const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Order = require('./Order');
const Product = require('./Product');

const OrderLine = db.define('OrderLine', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    value: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    valueTax: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    state: {
        type: DataTypes.UUID,
        allowNull: false,
    }
},
)

OrderLine.belongsTo(Order)
Order.hasMany(OrderLine)

OrderLine.belongsTo(Product)
Product.hasMany(OrderLine)

// OrderLine.sync({ force: true })

module.exports = OrderLine