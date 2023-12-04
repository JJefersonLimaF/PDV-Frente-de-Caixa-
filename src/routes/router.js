const express = require('express');
const verifyLogin = require('./middlewares/authorization');
const { listCategories } = require('./controller/product');
const { registerUser, loginUser } = require('./controller/users');
const validateReqBody = require('./middlewares/validateReqBody');
const schemaEmailAndPassword = require('./schemas/schemaEmailAndPass');
const schemaUser = require('./schemas/schemaUser');

const router = express();



router.use(express.json());

router.get('/categoria', listCategories)
router.get('/');

router.post('/usuarios', validateReqBody(schemaUser), registerUser);
router.post('/login', validateReqBody(schemaEmailAndPassword), loginUser);


router.use(verifyLogin);


router.get('/');


module.exports = router;