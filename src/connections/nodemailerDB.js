const nodemailer = require('nodemailer');

const transportador = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    // secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const usuario = (req, res) => {
    return user = req.user;
}

const send = {
        from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
        to: `${usuario.nome} <${usuario.email}>`,
        subject: 'Cadastro concluído com sucesso!',
        

};


const sendEmail = async () => {
    await transportador.sendMail(send);
};



module.exports = sendEmail;
