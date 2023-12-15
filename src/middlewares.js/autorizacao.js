require('dotenv').config()
const knex = require('../connections/database');
const jwt = require('jsonwebtoken');

const verificarLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json('Não autorizado');
    }

    const token = authorization.replace('Bearer ', '').trim();

    try {
        const { id } = jwt.verify(token, process.env.JWT);

        const usuario = await knex('usuarios').where({id}).first();

        if (!usuario) {
            return res.status(404).json('Usuario não encontrado');
        }

        const { senha, ...novoUsuario } = usuario;

        req.usuario = novoUsuario;

        next();

    } catch (error) {
        return res.status(401).json(error.message);
    };
};

module.exports = verificarLogin;
