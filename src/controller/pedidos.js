const knex = require('../connections/database');
const { format } = require('date-fns');

const cadastrarPedido = async (req, res) => {

    const { data, pedido_produtos } = req.body;

    const preco = req.total;

    try {

        const dataDoPedido = data ? data : format(new Date(), 'dd-MM-yyyy');

        const totalDePedidos = await knex('pedidos').insert({data: dataDoPedido, valor_total: preco}).returning('*');
       
        for (const novo of pedido_produtos) {
            await knex('pedido_produtos').insert({pedido_id: totalDePedidos[0].id, produto_id: novo.produto_id, quantidade_produto: novo.quantidade_produto}).returning('*');
        };

        const dataFinal = format(totalDePedidos[0].data, 'dd-MM-yyyy');

        const resultado = {
            id: totalDePedidos[0].id,
            data: dataFinal,
            valor_total: totalDePedidos[0].valor_total
        };

        return res.status(201).json(resultado);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    };
};

const listarPedido = async (req, res) => {

    const { daquiEndiante } = req.query;

    try {

        const BancoDePedidos = knex('pedidos')
            .select({
                pedido_id: 'pedidos.id',
                valor_total: 'pedidos.valor_total',
                data: 'pedidos.data',
                pedido_produto_id: 'pedido_produtos.id',
                quantidade_produto: 'pedido_produtos.quantidade_produto',
                valor_produto: 'produtos.valor',
                produto_id: 'pedido_produtos.produto_id'
            })
            .leftJoin('pedido_produtos', 'pedidos.id', 'pedido_produtos.pedido_id')
            .leftJoin('produtos', 'pedido_produtos.produto_id', 'produtos.id').modify((queryBuilder) => {

                if (daquiEndiante) {
                    queryBuilder.where('pedidos.data', '>=', daquiEndiante);
                }
            });

        const pedidos = await BancoDePedidos;

        const novaData = pedidos.map((item) => {

            const novaData = format(item.data, 'dd-MM-yyyy')
            return {
                ...item,
                data: novaData
            };
        });

        const pedidoEmGrupo = {};

        for (const dataItem of novaData) {
            const {
                pedido_id,
                valor_total,
                data,
                pedido_produto_id,
                quantidade_produto,
                valor_produto,
                produto_id
            } = dataItem;

            if (!pedidoEmGrupo[pedido_id]) {
                pedidoEmGrupo[pedido_id] = {
                    pedido: {id: pedido_id, valor_total, data},
                    pedido_produtos: []
                };
            };

            pedidoEmGrupo[pedido_id].pedido_produtos.push({
                id: pedido_produto_id,
                quantidade_produto,
                valor_produto,
                pedido_id,
                produto_id
            });
        };

        const listagemFinal = Object.values(pedidoEmGrupo);

        return res.status(200).json(listagemFinal);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    };
};

module.exports = {
    cadastrarPedido,
    listarPedido,
};