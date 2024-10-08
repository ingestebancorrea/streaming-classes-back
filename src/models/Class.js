const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/config');

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
        references: {
            model: 'users', // Asegúrate de que este sea el nombre correcto de la tabla
            key: 'id',
        },
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'classes',
    timestamps: false,
});

module.exports = ClassModel;