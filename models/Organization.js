const { DataTypes } = require('sequelize');
const db = require('../config/database');
const OrganizationType = require('./OrganizationType');

const Organization = db.define('Organization', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    organizationType: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: OrganizationType,
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

// Organization.sync({ force: true })

module.exports = Organization