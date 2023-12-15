const joi = require('joi');

const schemaUsuario = joi.object({
   
     nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório!',
        'string.empty': 'O campo nome é obrigatório!'

     }),
     email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório!',
        'string.email': 'É necessário um email em formato válido!',
        'string.empty': 'O campo email é obrigatório!'
     }),
     senha: joi.string().min(4).required().messages({
        'any.required': 'O campo senha é obrigatório!',
        'string.min': 'O campo senha é mais curta que o esperado!',
        'string.empty': 'O campo senha é obrigatório!'
     })
});


module.exports = schemaUsuario;
