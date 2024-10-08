const errorMessages = require('../common/errorMessage');
const Moderator = require('../models/Moderator');

const createModerator = async (data) => {
    const { id_user } = data;

    const moderator = new Moderator({ id_user });

    try {
        const savedModerator = await moderator.save();

        return {
            ok: true,
            moderator: savedModerator
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: errorMessages.SERVER.GENERAL_ERROR,
        });
    }
};

module.exports = {
    createModerator
};