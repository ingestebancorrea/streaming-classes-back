/* 
 Rutas de Usuarios/Auth 
 host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { fieldValidator }  = require('../src/middlewares/fieldValidator');
const { createUser, login, revalidateToken } = require('../src/controllers/auth');
const { tokenValidator } = require('../src/middlewares/tokenValidator');

router.post(
    '/register',
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        fieldValidator
    ],
    createUser
);

router.post(
    '/', 
    [ // middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        fieldValidator
    ],
    login
);

router.get('/renew', tokenValidator, revalidateToken);

module.exports = router;