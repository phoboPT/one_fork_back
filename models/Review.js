const { DataTypes } = require('sequelize');
const db = require('../config/database')
const User = require('./User')
const Organization = require('./Organization')

const Review = db.define('Review', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull:true
    }
},
)
Review.belongsTo(Organization)
Organization.hasMany(Review)

Review.belongsTo(User)
User.hasMany(Review)

// Review.sync({ alter: true })

module.exports = Review