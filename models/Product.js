const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Tax = require('./Tax');
const ProductType = require('./ProductType');
const Organization = require('./Organization');

const Product = db.define('Product', {
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
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
)

Product.belongsTo(ProductType)
ProductType.hasMany(Product)

Product.belongsTo(Organization)
Organization.hasMany(Product)

Product.belongsTo(Tax)
Tax.hasMany(Product)

// Product.sync({ alter: true }) 

module.exports = Product