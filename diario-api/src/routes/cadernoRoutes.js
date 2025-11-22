const express = require('express');
const router = express.Router();
const cadernoController = require('../controllers/cadernoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, cadernoController.criarCaderno);

router.get('/', authMiddleware, cadernoController.listarCadernos);

router.get('/:id/entradas', authMiddleware, cadernoController.listarEntradasDoCaderno);

module.exports = router;