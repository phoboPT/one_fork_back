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
    // idProduct: {
    //     type: DataTypes.UUID,
    //     allowNull: false,
    //     references: {
    //         model: Product,
    //         key: 'id'
    //     }
    // },
    // idOrganization: {
    //     type: DataTypes.UUID,
    //     allowNull: false,
    //     references: {
    //         model: Organization,
    //         key: 'id'
    //     }
    // },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
)

Product.belongsToMany(Organization, { through: ProductOrganization })

// ProductOrganization.sync({ alter: true })

module.exports = ProductOrganization