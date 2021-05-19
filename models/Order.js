const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Table = require('./Table');
const User = require('./User');

const Order = db.define('Order', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    idUser: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    idTable: {
        type: DataTypes.UUID,
        allowNull: false, references: {
            model: Table,
            key: 'id'
        }
    },
    totalValue: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    totalValueTAx: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    state: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},
)

// Order.sync({ force: true })

module.exports = Order