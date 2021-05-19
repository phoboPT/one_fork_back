const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Product = require('./Product');
const Restaurant = require('./Restaurant');

const ProductRestaurant = db.define('ProductRestaurant', {
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

// ProductRestaurant.sync({ force: true })

module.exports = ProductRestaurant