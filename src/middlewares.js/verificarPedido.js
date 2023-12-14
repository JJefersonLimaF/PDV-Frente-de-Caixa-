const knex = require('../connections/database');


const produtoPeloId = async (produto_Id) => {
    return await knex('produtos').where({ id: produto_id}).first();
};

const verificarProdutos = async (req, res, next) => {

    const { pedido_produtos } = req.body;
    let total = 0;

    try {
        const produtoPromises = pedido_produtos.map(async (each) => {

            const { produto_id, quantidade_produto } = each;

            const encontrado = await produtoPeloId(produto_id);

            if (!encontrado) {
                throw new Error('Um ou mais produtos não existem no banco de dados.');
            }

            total += encontrado.valor * quantidade_produto;
        });

        await Promise.all(produtoPromises);

        req.total = total;
        return next();
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
};

module.exports = {
    verificarProdutos
};