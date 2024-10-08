const { response } = require('express');
const ClassModel = require('../models/Class');
const errorMessages = require('../common/errorMessage');
const User = require('../models/User');
const Moderator = require('../models/Moderator');
const { getRoleById } = require('./auth');

const getClass = async (req, res = response) => {
    const userId = req.id;

    try {
        const user = await getRoleById(userId);
        const idRole = user.dataValues.id_rol;

        if (idRole === 2) { // 2 is the ID for moderators
            const objClass = await ClassModel.findAll({
                where: {
                    is_active: true // Solo seleccionar clases activas
                },
                include: [{
                    model: Moderator,
                    required: true, // INNER JOIN
                    include: [{
                        model: User,
                        attributes: ['id', 'name', 'username', 'id_rol'],
                        where: { id: userId } // Filtrando por el ID del usuario
                    }]
                }],
                attributes: ['id', 'title', 'description', 'video_url', 'date']
            });

            if (!objClass.length) {
                return res.status(400).json({
                    ok: false,
                    msg: "El moderador no se encuentra asociado a la clase activa.",
                });
            }

            return res.json({
                data: objClass
            });
        } else {
            const allClasses = await ClassModel.findAll({
                where: {
                    is_active: true
                },
                attributes: ['id', 'title', 'description', 'video_url', 'date']
            });

            return res.json({
                data: allClasses
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: errorMessages.SERVER.GENERAL_ERROR,
        });
    }
};

module.exports = { getClass };