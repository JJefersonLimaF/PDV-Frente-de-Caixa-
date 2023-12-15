const joi = require('joi');

const validarCorpoRequisicao = joiSchema => async (req, res, next) => {

    try {
        
        await joiSchema.validateAsync(req.body);

        next()

    } catch (error) {
        console.log(validarCorpoRequisicao)
        console.log('é aqui' + error)
        return res.status(500).json({mensagem: error.message});
    }

};

module.exports = validarCorpoRequisicao;