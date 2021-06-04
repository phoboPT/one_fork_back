const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Organization = require('./Organization');

const Table = db.define('Table', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
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

// Table.belongsTo(Organization)
// Organization.hasMany(Table)


// Table.sync({ force: true }) 

module.exports = Table