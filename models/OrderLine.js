const { DataTypes } = require('sequelize');
const db = require('../config/database');
const OrderLine = require('./Order');
const OrderState = require('./OrderState');
const Product = require('./Product');
const Order = require('./Table');

const OrderLine = db.define('OrderLine', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    idOrder: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Order,
            key: 'id'
        }
    },
    idProduct: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.NUMBER,
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
        type: DataTypes.FLOAT,
        allowNull: false,
        references: {
            model: OrderState,
            key: 'id'
        }
    }



},
)

//   OrganizationType.sync({force: true})

module.exports = OrderLine