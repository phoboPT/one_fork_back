const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Ingredient = require('./Ingredient');
const Product = require('./Product');

const IngredientProduct = db.define('IngredientProduct', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    // idIngredient: {
    //     type: DataTypes.UUID,
    //     allowNull: false,
    //     references: {
    //         model: Ingredient,
    //         key: 'id'
    //     }
    // },
    // idProduct: {
    //     type: DataTypes.UUID,
    //     allowNull: true,
    //     references: {
    //         model: Product,
    //         key: 'id'
    //     }
    // },
},
)

Ingredient.belongsToMany(Product, { through: IngredientProduct })



// IngredientProduct.sync({ force: true }) 

module.exports = IngredientProduct