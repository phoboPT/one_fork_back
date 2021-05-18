const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');


const User = db.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
        validate: {
            isEmail: {
                msg: 'Please enter an email'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    active: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
    },
    permission: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'USER',
    },
    fiscalNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true
    },
},
    // { freezeTableName: true }
)
//User.sync({ alter: true })

module.exports = User