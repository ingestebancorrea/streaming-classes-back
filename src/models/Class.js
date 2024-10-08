const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');
const Moderator = require('../models/Moderator');

const ClassModel = sequelize.define('Class', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    video_url: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    id_moderator: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'classes',
    timestamps: false,
});

ClassModel.belongsTo(Moderator, { foreignKey: 'id_moderator' });

module.exports = ClassModel;