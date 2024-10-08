const { Router } = require("express");
const { tokenValidator } = require('../middlewares/tokenValidator');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { getMessagesByIdClass, createMessage } = require('../controllers/message');

const router = Router();

// Toda las peticiones tienen que pasar por la validación de JWT
router.use(tokenValidator);

// Obtener mensajes
router.get('/class/:id', getMessagesByIdClass);

// Crear un nuevo mensaje
router.post('/',
    [
        check('id_class', 'El ID de la clase es obligatorio').not().isEmpty().isInt(),
        check('message', 'El mensaje es obligatorio y no puede exceder 250 caracteres').not().isEmpty().isLength({ max: 250 }),
        check('date', 'La fecha es obligatoria y debe ser una fecha válida').not().isEmpty().isISO8601(),
        fieldValidator // Middleware para manejar errores de validación
    ],
    createMessage
);

module.exports = router;