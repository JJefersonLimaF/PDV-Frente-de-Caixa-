const express = require('express');
const listCategories = require('../controller/categories');
const usuarios = require('../controller/usuarios');
const schemaEmailAndPassword = require('../schemas/schemaEmail&Senha');
const schemaUsuario = require('../schemas/schemaUsuario');
const validarCorpoRequisicao = require('../middlewares.js/validarCorpoRequisicao');
const {schemaCorpoDoProduto, schemaCorpoDoPedido} = require('../schemas/schemaProduto');
const {verificarProdutos} = require('../middlewares.js/verificarPedido');
const { listarPedido, cadastrarPedido } = require('../controller/pedidos');
const { verificarIdDoProduto, produtoDuplicado } = require('../middlewares.js/verificarProduto');
const verificarLogin = require('../middlewares.js/autorizacao');
const { apagarArquivo } = require('../controller/produtos');
const uploadFile = multer.single('produto_imagem');
const rotas = express();

rotas.use(express.json());


rotas.get('/categoria', listCategories)
rotas.post('/usuario', validateReqBody(schemaUsuario), usuarios.cadastrarUsuario);  
rotas.post('/login', validateReqBody(schemaEmailAndPassword), usuarios.loginUsuario);

rotas.use(verificarLogin);

router.post('/produto', uploadFile, validarCorpoRequisicao(schemaCorpoDoProduto), produtoDuplicado, cadastrarProduto);
router.get('/produto', listarProdutos);
router.get('/produto/:id', verificarIdDoProduto, encontrarIdProduto);
router.delete('/produto/:id', verificarIdDoProduto, apagarArquivo);

router.post('/pedido', validarCorpoRequisicao(schemaCorpoDoPedido), verificarProdutos, cadastrarPedido);
router.get('/pedido', listarPedido);

module.exports = rotas;
