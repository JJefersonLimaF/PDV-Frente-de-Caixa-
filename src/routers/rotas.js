const express = require('express');
const multer = require('../services/multer')
const usuarios = require('../controller/usuarios');
const schemaEmailAndPassword = require('../schemas/schemaEmail&Senha');
const schemaUsuario = require('../schemas/schemaUsuario');
const validarCorpoRequisicao = require('../middlewares.js/validarCorpoRequisicao');
const {schemaCorpoDoProduto, schemaCorpoDoPedido} = require('../schemas/schemaProduto');
const {verificarProdutos, produtoPeloId} = require('../middlewares.js/verificarPedido');
const pedidos = require('../controller/pedidos');
const {verificarIdDoProduto, duplicado} = require('../middlewares.js/verificarProduto');
const verificarLogin = require('../middlewares.js/autorizacao');
const produtos = require('../controller/produtos');
const listCategorias = require('../controller/categorias');
const rotas = express();

rotas.use(express.json());


rotas.get('/categoria', listCategorias)
rotas.post('/usuario', validarCorpoRequisicao(schemaUsuario), usuarios.cadastrarUsuario);  
rotas.post('/login', validarCorpoRequisicao(schemaEmailAndPassword), usuarios.loginUsuario);

rotas.use(verificarLogin);

rotas.post('/produto', multer.single('produto_imagem'), validarCorpoRequisicao(schemaCorpoDoProduto), duplicado, produtos.cadastrarProduto);

rotas.get('/produto', produtos.listarProdutos);
rotas.get('/produto/:id', verificarIdDoProduto, produtoPeloId, produtos.encontrarIdProduto);
rotas.delete('/produto/:id', verificarIdDoProduto, produtoPeloId, produtos.apagarArquivo);

rotas.post('/pedido', validarCorpoRequisicao(schemaCorpoDoPedido), verificarProdutos, pedidos.cadastrarPedido);
rotas.get('/pedido', pedidos.listarPedido);

module.exports = rotas;
