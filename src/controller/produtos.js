const knex = require('../connections/database');
const { uploadArquivo, deletarArquivo } = require('../services/imageStorage');

const cadastrarProduto = async (req, res) => {

    const {descricao, valor } = req.body;

    const {file} = req;
    
    try {
        const produtoInserido = await knex('produtos').insert({
            descricao,
            valor
        }).returning('*');

        if (file) {
            try {
                const image = await uploadArquivo(`produtos/${produtoInserido[0].id}/${file.originalname}`, file.buffer, file.mimetype);
                await knex('produtos').where({id: produtoInserido[0].id}).update({produto_imagem: image.url});
            } catch (error) {
                return res.status(500).json({mensagem: "Erro interno do servidor"});
            }
        }

        const produto = await knex('produtos').where({id: produtoInserido[0].id}).first();

        if (!produto) {
            return res.status(400).json({mensagem: 'Produto não cadastrado'});
        }

        return res.status(200).json(produto);
        
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const listarProdutos = async (req, res) => {

    try {

        const listar = await knex('produtos').returning('*');

        if (!listar.length > 0) {
            return res.status(400).json('Produto não encontrado');
        }

        return res.status(200).json(listar);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
};

const encontrarIdProduto = async (req, res) => {

    const {id} = req.params;

    try {

        const encontrado = await knex('produtos').where({id}).first();

        if (!encontrado) {
            return res.status(404).json({mensagem: 'Produto não encontrado'});
        }

        return res.status(200).json(encontrado);

    } catch (error) {
        return res.status(500).json({mensagem: "Erro interno do servidor"});
    }
};

const apagarArquivo = async (req, res) => {
    const {id} = req.params;

    if (!id) {
        return res.status(400).json("O id do Arquivo obrigatóriamente deve ser válido");
    }

    try {
        const produto = await knex('produtos').where({id}).first();
        if (!produto) {
            return res.status(404).json({mensagem: "Produto não encontrado"});
        }

        if (produto.produto_imagem) {
            const arq = produto.produto_imagem.replace(/^.*?\/produtos\/\d+\//, `produtos/${id}/`);
            await deletarArquivo(arq);
        }

        await knex('produtos').where({id}).del();

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do servidor'});
    }
};

module.exports = {
    cadastrarProduto,
    listarProdutos,
    encontrarIdProduto,
    apagarArquivo,
};