const express = require('express');
const router = express.Router();
const cadernoController = require('../controllers/cadernoController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/', authMiddleware, cadernoController.criarCaderno);


router.get('/', authMiddleware, cadernoController.listarCadernos);


router.put('/:id', authMiddleware, cadernoController.atualizarCaderno);


router.delete('/:id', authMiddleware, cadernoController.deletarCaderno);


router.get('/:id/entradas', authMiddleware, cadernoController.listarEntradasDoCaderno);

module.exports = router;