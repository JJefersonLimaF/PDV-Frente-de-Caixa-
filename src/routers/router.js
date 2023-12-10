const express = require('express');
const verifyLogin = require('../middlewares.js/authorization');
const listCategories = require('../controller/categories');
const { registerUser, loginUser } = require('../controller/users');
const validateReqBody = require('../middlewares.js/validateReqBody');
const schemaEmailAndPassword = require('../schemas/schemaEmailAndPassword');
const schemaUser = require('../schemas/schemaUsers');

const router = express();


router.use(express.json());

router.get('/categoria', listCategories)
router.get('/');

router.post('/usuarios', validateReqBody(schemaUser), registerUser);
router.post('/login', validateReqBody(schemaEmailAndPassword), loginUser);

router.use(verifyLogin);

router.get('/');

module.exports = router;
