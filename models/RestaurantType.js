const { DataTypes } = require('sequelize');
const db = require('../config/database')

const RestaurantType = db.define('ResturantType', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
)

//RestaurantType.sync({ force: true })

module.exports = RestaurantType