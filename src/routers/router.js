const express = require('express');
const verifyLogin = require('../middlewares.js/authorization');
const listCategories = require('../controller/categories');
const usuarios = require('../controller/users');
const validateReqBody = require('../middlewares.js/validateReqBody');
const schemaEmailAndPassword = require('../schemas/schemaEmailAndPassword');
const schemaUser = require('../schemas/schemaUsers');

const router = express();


router.use(express.json());


router.get('/categoria', listCategories)
router.post('/usuarios', validateReqBody(schemaUser), usuarios.registerUser);  
router.post('/login', validateReqBody(schemaEmailAndPassword), usuarios.loginUser);
router.use(verifyLogin);



module.exports = router;
