const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Product = require('./IngredientProduct');
const Taxes = require('./Tax');

const Product = db.define('Product', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    productType: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Product,
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
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Taxes,
            key: 'id'
        }
    },
    idRestaurant: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Restaurant,
            key: 'id'
        }
    }
},
)

//   OrganizationType.sync({force: true})

module.exports = Product