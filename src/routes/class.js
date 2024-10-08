const { Router } = require("express");
const { tokenValidator } = require('../middlewares/tokenValidator');
const { getClass } = require('../controllers/class');

const router = Router();

// Toda las peticiones tienen que pasar por la validación de JWT
router.use(tokenValidator);

// Obtener clases
router.get('/', getClass);

module.exports = router;