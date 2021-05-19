const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Tax = require('./Tax');
const ProductType = require('./ProductType');
const Restaurant = require('./Restaurant');

const Product = db.define('Product', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    productType: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: ProductType,
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
    tax: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Tax,
            key: 'id'
        }
    },
    idRestaurant: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Restaurant,
            key: 'id'
        }
    }
},
)

// Product.sync({ force: true })

module.exports = Product