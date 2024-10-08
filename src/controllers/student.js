const errorMessages = require('../common/errorMessage');
const Student = require('../models/Student');

const createStudent = async (data) => {
    const { id_user } = data;

    const student = new Student({ id_user });

    try {
        const savedStudent = await student.save();

        return {
            ok: true,
            student: savedStudent
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
    createStudent
}