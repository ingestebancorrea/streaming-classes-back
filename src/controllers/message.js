const { response } = require('express');
const Message = require('../models/Message');
const User = require('../models/User');
const Role = require('../models/Role');
const errorMessages = require('../common/errorMessage');

const getMessagesByIdClass = async (req, res = response) => {
    const { id } = req.params;
    
    try {
        const classId = parseInt(id, 10);

        const messages = await Message.findAll({
            where: {
                id_class: classId
            },
            attributes: ['id', 'id_class', 'message', 'date'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: Role,
                            attributes: ['name']
                        }
                    ]
                }
            ],
            order: [['date', 'ASC']]
        });
        
    
        const formattedMessages = messages.map(message => ({
            id: message.id,
            id_class: message.id_class,
            message: message.message,
            date: message.date,
            user: {
                id: message.User.id,
                name: message.User.name,
                role: message.User.Role.name
            }
        }));

        res.json({
            data: formattedMessages
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: errorMessages.SERVER.GENERAL_ERROR,
        });
    }
};

const createMessage = async (req, res = response) => {
    const { id_class, message, date } = req.body;
    console.log(req);

    try {
        const newMessage = new Message({
            id_class,
            id_user: req.id,
            message,
            date
        });

        const savedMessage = await newMessage.save();

        res.status(201).json({
            message: savedMessage
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: errorMessages.SERVER.GENERAL_ERROR,
        });
    }
};

module.exports = { 
    getMessagesByIdClass,
    createMessage
}