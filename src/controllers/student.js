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
        throw new Error('Error while saving the student');
    }
};

module.exports = {
    createStudent
}