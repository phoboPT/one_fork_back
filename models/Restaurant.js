const { DataTypes } = require('sequelize');
const db = require('../config/database');
const RestaurantType = require('./RestaurantType');

const Restaurant = db.define('Restaurant', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    restaurantType: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: RestaurantType,
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gpsLocation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    celphone: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    nif: {
        type: DataTypes.INTEGER,
        allowNull: true
    }

},
)

//Restaurant.sync({ force: true })

module.exports = Restaurant