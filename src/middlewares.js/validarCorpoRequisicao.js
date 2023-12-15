const joi = require('joi');

const validarCorpoRequisicao = joiSchema => async (req, res, next) => {

    try {
        
        await joiSchema.validate(req.body);

        next()

    } catch (error) {
        console.log(validarCorpoRequisicao)
        console.log('é aqui' + error)
        return res.status(400).json({mensagem: error.message});
    }

};

module.exports = validarCorpoRequisicao;