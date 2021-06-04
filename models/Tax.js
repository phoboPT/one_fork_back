const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database')

const Tax = db.define('Tax', {
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
    value: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
},
)

// Tax.sync({ alter: true }) 

module.exports = Tax