const knex = require('../connections/database');

const produtoDuplicado = async (req, res, next) => {
    const { descricao } = req.body;

    try {
        const encontrado = await knex('produtos').where({ descricao });

        if (encontrado.length) {
            return res.status(400).json({ mensagem: 'Produto com descrição já existente.' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const verificarIdDoProduto = async (req, res, next) => {
    const { id } = req.params;

    try {

        const encontrado = await knex('produtos').where({ id }).first();

        if (!encontrado) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' });
        }
        req.produto = encontrado;
        next();
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};


module.exports = {
    produtoDuplicado,
    verificarIdDoProduto,
};