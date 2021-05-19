const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Restaurant = require('./Restaurant');

const Table = db.define('Table', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    idRestaurant: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Restaurant,
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
)

//Table.sync({ force: true })

module.exports = Table