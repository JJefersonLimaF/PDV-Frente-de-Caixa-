const joi = require('joi');

const schemaCorpoDoPedido = joi.object({
    data: 
    joi.string().trim().min(1).messages({
        
        'any.required': 'O campo data está vazio',
        'string.empty': 'O campo data está vazio',
        'string.min': 'A Quantidade de caracteres é inválida.'
    }),

    pedido_produtos: joi.array().items(joi.object({
            produto_id: 
            joi.number().integer().required().min(1).messages({

                'any.required': 'O campo produto_id é obrigatório',
                'number.integer': 'Apenas valores inteiros são permitidos',
                'number.min': 'O valor minimo permitido é 1.',
                'number.base': 'O número informado não é válido.',
            }),

            quantidade_produto: 
            joi.number().integer().required().min(0).messages({
                'any.required': 'O campo produto_id é obrigatório.',
                'number.integer': 'Apenas valores inteiros são permitidos.',
                'number.min': 'O valor minimo permitido é 0.',
                'number.base': 'O valor informado não é válido.',
            })
        })
    ).required().messages({

        'any.required': 'Os campos pedido_produtos é obrigatório, produto_id e quantidade_produto são obrigatórios',
    })
});

module.exports = schemaCorpoDoPedido;