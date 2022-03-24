const { Router } = require('express');
const express = require('express');
const router = express.Router();
const CrudController = require('../controllers/CrudController');


router.get('/', CrudController.index);
router.get('/profile', CrudController.profile);
router.get('/users/:id', CrudController.show);
router.post('/users/store', CrudController.store);
router.put('/users/:id', CrudController.update);
router.delete('/users/:id', CrudController.destroy);

module.exports = router
