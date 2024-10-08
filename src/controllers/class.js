const { response } = require('express');
const ClassModel = require('../models/Class');
const errorMessages = require('../common/errorMessage');

const getClass = async (req, res = response) => {
    try {
        const objClass = await ClassModel.findAll({
            where: {
                is_active: true // Only select active classes
            },
            attributes: ['id','title', 'description', 'video_url']
        });

        res.json({
            data: objClass
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: errorMessages.SERVER.GENERAL_ERROR,
        });
    }
};

module.exports = { getClass };