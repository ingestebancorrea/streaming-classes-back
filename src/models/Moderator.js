const { DataTypes } = require('sequelize');
const { sequelize } =  require('../database/config');

const Moderator = sequelize.define('Moderator', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
}, {
    tableName: 'moderators',
    timestamps: false, 
});

module.exports = Moderator;