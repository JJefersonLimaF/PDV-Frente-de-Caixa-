const aws = require("aws-sdk");
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3);

const s3 = new aws.S3({
    
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.APP_KEY
    }
});

const uploadArquivo = async (path, buffer, mimetype) => {

    try {
        const file = await s3.upload({

            Bucket: process.env.BLACKBLAZE_BUCKET,
            Key: path,
            Body: buffer,
            ContentType: mimetype
    
        }).promise()
    
        return {
            url: file.Location,
            path: file.Key
        };

    } catch (error) {
        return res.status(500).json({menssagem: 'Erro interno do servidor'})
    }

};

const deletarArquivo = async (path) => {

    try {

        await s3.deleteObject({
            Bucket: process.env.BLACKBLAZE_BUCKET,
            Key: path
        }).promise();

    } catch (error) {
        return res.status(500).json({menssagem: 'Erro interno do servidor'})
    }
};

module.exports = {
    uploadArquivo,
    deletarArquivo
};
