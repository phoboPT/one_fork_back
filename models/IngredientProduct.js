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
},
)

Ingredient.belongsToMany(Product, { through: IngredientProduct })
Product.belongsToMany(Ingredient, { through: IngredientProduct })

IngredientProduct.belongsTo(Ingredient)
Ingredient.hasMany(IngredientProduct)

IngredientProduct.belongsTo(Product)
Product.hasMany(IngredientProduct)


// IngredientProduct.sync({ alter: true }) 

module.exports = IngredientProduct