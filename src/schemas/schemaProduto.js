const joi = require('joi');

const schemaCorpoDoProduto = joi.object({
    descricao: 
    joi.string().trim().min(1).required().messages({

        'string.empty': 'O campo descrição é obrigatório',
        'string.min': 'Quantidade de caracteres inválido',
        'any.required': 'O campo descrição é obrigatório',
    }),

    valor: 
    joi.number().required().integer().positive().messages({
        
        'any.required': 'O campo valor é obrigatório',
        'number.positive': 'Valor inválido, tente um numero positivo',
        'number.integer': 'Apenas valores inteiros são permitidos',
        'number.base': 'O número informado não é um valor válido',
    })
});

module.exports = schemaCorpoDoProduto;