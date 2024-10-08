const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');
const { createStudent } = require('./student');
const { createModerator } = require('./moderator');
const errorMessages = require('../common/errorMessage');
const { getRoleByAlias } = require('./role');

const createUser = async (req, res = response) => {
    const { username, password, name, role } = req.body;

    try {
        let user = await User.findOne({ where: { username } });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese correo'
            });
        }

        const idRole = await getRoleByAlias(role);

        user = await User.create({
            username,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync()), // Encrypt the password
            name,
            id_rol: idRole
        });

        if (idRole === 1) {
            await createStudent({ id_user: user.id });
        } else if (idRole === 2) {
            await createModerator({ id_user: user.id });
        }

        // Generate JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            data: {
                id: user.id,
                name: user.name,
                token
            },
            msg: "Usuario registrado exitosamente.",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: errorMessages.SERVER.GENERAL_ERROR,
        });
    }
};

const login = async (req, res = response) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ where: { username } });

        // Check if user exists and validate password
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o contraseña incorrectos'
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id, user.name);

        res.status(200).json({
            ok: true,
            data: {
                id: user.id,
                name: user.name,
                token
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: errorMessages.SERVER.GENERAL_ERROR,
        });
    }
};

const revalidateToken = async (req, res = response) => {

    const { uid, name } = req;

    //Generar nuevo JWT y retornarlo en esta petición
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = { createUser, login, revalidateToken }