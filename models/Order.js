const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Order = require('./Table');
const User = require('./User');

const Order = db.define('Order', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    idUser: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    idTable: {
        type: DataTypes.STRING,
        allowNull: false, references: {
            model: Order,
            key: 'id'
        }
    },
    totalValue: {
        type: DataTypes.Float,
        allowNull: false
    },
    totalValueTAx: {
        type: DataTypes.Float,
        allowNull: false
    },
    state: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }



},
)

//   OrganizationType.sync({force: true})

module.exports = Order