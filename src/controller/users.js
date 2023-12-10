const bcrypt = require('bcrypt');
const knex = require('../connections/databaseConnection');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const {nome, email, senha} = req.body;

    try {
        
        const emailExiste = await knex('usuarios').where({email}).first()
    
        if (emailExiste) {
            return res.status(400).json('Email já existe!');
        }

        const senhaCripitografada = await bcrypt.hash(senha, 10);

        const usuario = await knex('usuarios').insert({
            nome,
            email,
            senha: senhaCripitografada
        }).returning('*')

        if (!usuario[0]) {
            return res.status(400).json({menssagem: 'O usuário não foi cadastrado!'})        
        }
        
        const {senha: _, ...user} = usuario[0];

        return res.status(201).json(user);

    } catch (error) {
        return res.status(500).json({message: error.message});
    }

};

const loginUser = async (req, res) => {

    const {email, senha} = req.body;

    try {

        const usuario = await knex('usuarios').where({email}).first()
        
        if (!usuario) {
            return res.status(404).json('Usuário não encontrado!');
        }

        await bcrypt.compare(senha, usuario.senha);

        const token = jwt.sign({id: usuario.id}, process.env.JWT, {expiresIn: '24h'});

        const {senha: _,...dadosDoUsuario} = usuario

        return res.json({
            usuario: dadosDoUsuario,
            token
        });

    } catch (error) {
        return res.status(500).json({message: error.message});
    }

};

module.exports = {
    registerUser,
    loginUser
}
