const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database')

const OrderState = db.define('OrderState', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
)

// OrderState.sync({ force: true })

module.exports = OrderState