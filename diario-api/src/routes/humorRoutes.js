const express = require('express');
const router = express.Router();
const humorController = require('../controllers/humorController');

router.post('/', humorController.criarHumor);
router.get('/', humorController.listarHumores);
router.put('/:id', humorController.atualizarHumor);
router.delete('/:id', humorController.deletarHumor);

module.exports = router;