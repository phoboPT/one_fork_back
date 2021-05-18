const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Ingredient = require('./Ingredient');

const IngredientProduct = db.define('IngredientProduct', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    idIngredient: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Ingredient,
            key: 'id'
        }
    },
    idProduct: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: Product,
            key: 'id'
        }
    },
},
)

//   OrganizationType.sync({force: true})

module.exports = IngredientProduct