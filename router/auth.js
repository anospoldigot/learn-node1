const { Router } = require('express');
const express = require('express');
const router = express.Router();
// const CrudController = require('../controllers/CrudController');
const { body, validationResult } = require('express-validator');

const AuthController = require('../controllers/AuthController')

router.get('/login', AuthController.login);
router.post('/login',[
    body('email').notEmpty(),
    body('password').notEmpty(),
],AuthController.loginPost);
router.get('/logout', AuthController.logout);
module.exports = router
