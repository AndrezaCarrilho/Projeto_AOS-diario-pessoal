const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para cadastrar: POST /auth/signup
router.post('/signup', authController.signup);

// Rota para logar: POST /auth/login
router.post('/login', authController.login);

module.exports = router;