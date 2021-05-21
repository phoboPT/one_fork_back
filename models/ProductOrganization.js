const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Product = require('./Product');
const Organization = require('./Organization');

const ProductOrganization = db.define('ProductOrganization', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    idProduct: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    idOrganization: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Organization,
            key: 'id'
        }
    }
},
)

// ProductOrganization.sync({ force: true })

module.exports = ProductOrganization