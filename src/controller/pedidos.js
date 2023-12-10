const knex = require('../connections/db');
const { format } = require('date-fns');

const cadastrarPedido = async (req, res) => {
    const { data, pedido_produtos } = req.body;
    const ValorTotal = req.total;
    try {
        const dataPedido = data ? data : format(new Date(), 'dd-MM-yyyy');
        const totalPedido= await knex('pedidos').insert({ data: dataPedido, valor_total: valorTotal}).returning('*');
        for (const each of pedido_produtos) {
            await knex('pedido_produtos').insert({ pedido_id: registroTotalpedido[0].id, produto_id: each.produto_id, quantidade_produto: each.quantidade_produto }).returning('*');
        };

        const dataFormatada = format(registroTotalpedido[0].data, 'dd-MM-yyyy');

        const returnObject = {
            id: registroTotalpedido[0].id,
            data: dataFormatada,
            valor_total: registroTotalpedido[0].valor_total
        };

        return res.status(201).json(returnObject);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    };
};

const listarPedidos = async (req, res) => {
    const { a_partir } = req.query;
    try {
        const query = knex('pedidos')
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
                if (a_partir) {
                    queryBuilder.where('pedidos.data', '>=', a_partir);
                }
            });

        const pedidos = await query;

        const dataFormatada = pedidos.map((element) => {
            const dataFormatada = format(element.data, 'dd-MM-yyyy')
            return {
                ...element,
                data: dataFormatada
            };
        });

        const pedidosAgrupados = {};

        for (const each of dataFormatada) {
            const {
                pedido_id,
                valor_total,
                data,
                pedido_produto_id,
                quantidade_produto,
                valor_produto,
                produto_id
            } = each;

            if (!pedidosAgrupados [pedido_id]) {
                pedidosAgrupados [pedido_id] = {
                    pedido: { id: pedido_id, valor_total, data },
                    pedido_produtos: []
                };
            };

            pedidosAgrupados [pedido_id].pedido_produtos.push({
                id: pedido_produto_id,
                quantidade_produto,
                valor_produto,
                pedido_id,
                produto_id
            });
        };

        const finalList = Object.values(pedidosAgrupados );

        return res.status(200).json(finalList);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    };
};

module.exports = {
    registrarPedido,
    listarPedidos
};
