const { DataTypes } = require('sequelize');
const { sequelize } =  require('../database/config');
const User = require('../models/User');

const Moderator = sequelize.define('Moderator', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'moderators',
    timestamps: false, 
});

Moderator.belongsTo(User, { foreignKey: 'id_user' });

module.exports = Moderator;