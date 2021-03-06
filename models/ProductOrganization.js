const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Product = require('./Product');
const Organization = require('./Organization');

const ProductOrganization = db.define('ProductOrganization', {
    // id: {
    //     type: DataTypes.UUID,
    //     primaryKey: true,
    //     defaultValue: DataTypes.UUIDV4
    // },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
)

Product.belongsToMany(Organization, { through: ProductOrganization })
Organization.belongsToMany(Product, { through: ProductOrganization })

ProductOrganization.belongsTo(Product)
Product.hasMany(ProductOrganization)

ProductOrganization.belongsTo(Organization)
Organization.hasMany(ProductOrganization)

// ProductOrganization.sync({ alter: true }) 

module.exports = ProductOrganization