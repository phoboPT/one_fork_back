const { DataTypes } = require('sequelize');
const db = require('../config/database')

const Ingredient = db.define('Ingredient', {
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

//Ingredient.sync({ force: true })

module.exports = Ingredient