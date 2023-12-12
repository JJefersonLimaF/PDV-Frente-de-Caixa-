const knex = require('../connections/database');




const listarProdutos = async (req, res) => {
    try {
        const listar = await knex('produtos').returning('*');
        if (!listar.length === 0) {
            return res.status(400).json('Nenhum produto encontrado');
        };
        return res.status(200).json(listar);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };
};

const encontrarIdProduto = async (req, res) => {
    const { id } = req.params;
    try {
        const encontrado = await knex('produtos').where({ id }).first();
        if (!encontrado) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' });
        };
        return res.status(200).json(encontrado);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    };
};



module.exports = {
    listarProdutos,
    encontrarIdProduto
};
