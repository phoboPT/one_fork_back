const { DataTypes } = require('sequelize');
const db = require('../config/database')

const OrganizationType = db.define('OrganizationType', {
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

// OrganizationType.sync({ alter: true })

module.exports = OrganizationType