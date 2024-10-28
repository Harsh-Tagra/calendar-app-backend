// routes/authRoutes.js
const express = require('express');
const AuthController = require('../controllers/authController'); 
const router = express.Router();

const authController = new AuthController(); 
router.post('/register', (req, res) => authController.registerUserController(req, res));
router.post('/login', (req, res) => authController.loginUserController(req, res));

module.exports = router;
