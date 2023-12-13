const express = require('express');
const verifyLogin = require('../middlewares.js/autorizacao');
const listCategories = require('../controller/categories');
const usuarios = require('../controller/usuarios');
const validateReqBody = require('../middlewares.js/validarCorpoRequisicao');
const schemaEmailAndPassword = require('../schemas/schemaEmail&Senha');
const schemaUser = require('../schemas/schemaUsuario');
const rotas = express();


rotas.use(express.json());


rotas.get('/categoria', listCategories)
rotas.post('/usuario', validateReqBody(schemaUser), usuarios.registerUser);  
rotas.post('/login', validateReqBody(schemaEmailAndPassword), usuarios.loginUser);

rotas.use(verifyLogin);



module.exports = rotas;
