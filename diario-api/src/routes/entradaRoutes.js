const express = require('express');
const router = express.Router();
const entradaController = require('../controllers/entradaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', entradaController.criarEntrada);
router.get('/', entradaController.listarEntradas);
router.delete('/:id', entradaController.deletarEntrada);

module.exports = router; 