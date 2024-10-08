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
        throw new Error('Error while saving the moderator')
    }
};

module.exports = {
    createModerator
};