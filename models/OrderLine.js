const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Order = require('./Order');
const OrderState = require('./OrderState');
const Product = require('./Product');

const OrderLine = db.define('OrderLine', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    idOrder: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Order,
            key: 'id'
        }
    },
    idProduct: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
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
        references: {
            model: OrderState,
            key: 'id'
        }
    }
},
)

//OrderLine.sync({ force: true })

module.exports = OrderLine