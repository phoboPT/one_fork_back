const { DataTypes } = require('sequelize');
const db = require('../config/database')

const ProductType = db.define('ProductType', {
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

//ProductType.sync({ force: true })

module.exports = ProductType