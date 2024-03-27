const { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectAclCommand} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const fs = require('fs')

const { Buffer } = require('buffer');

const { AWS_BUCKET_REGION, AWS_BUCKET_NAME, AWS_PUBLIC_KEY, AWS_SECRET_KEY } = process.env;

const clientS3 = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY
    }
});

const uploadFile = async (file) => {

    const date = new Date().getMonth()

    const numeroDelMes = date + 1

    const mesesDelAño = {
        1: "Enero",
        2: "Febrero",
        3: "Marzo",
        4: "Abril",
        5: "Mayo",
        6: "Junio",
        7: "Julio",
        8: "Agosto",
        9: "Septiembre",
        10: "Octubre",
        11: "Noviembre",
        12: "Diciembre"
    }


    const stream = await fs.createReadStream(file.tempFilePath)

    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key:  `${file.name}`,
        Body: stream,
    };

    const common = new PutObjectCommand(uploadParams);

    try {
        const result = await clientS3.send(common);
        return result
    } catch (err) {
        console.error("Error al subir el archivo:", err);
    }
};


const getFiles = async () =>{
    
    try {
        const command = await new ListObjectsCommand({ 
            Bucket: AWS_BUCKET_NAME        
        })

        const result = await clientS3.send(command);
    
        return result;
    } catch (error) {
        console.error("Error al querer obtener el backet:", err);
    }

}


const getFileByKey = async (keyName) =>{



    try {
        
       const common =  new GetObjectAclCommand({
            Bucket: AWS_BUCKET_NAME,
            Key: keyName
        })
    
        const result = await clientS3.send(common);
       
        return result;
    
    } catch (error) {
        console.error("Error al querer obtener el backet:", err);
    }

}


const getFileUrl = async (keyName) =>{
    try {
        const common =  new GetObjectAclCommand({
            Bucket: AWS_BUCKET_NAME,
            Key: keyName
        })

        return await getSignedUrl(clientS3, common, {expiresIn: 3600})
    
    } catch (error) {
        console.log(error);
        return error
    }
}


//TODO queda por terminar el download de s3.
const downloadFile = async (file) =>{
    
    console.log(file);
    
    try {
        
       const common =  new GetObjectAclCommand({
            Bucket: AWS_BUCKET_NAME,
            Key: file
        })
    
        const result = await clientS3.send(common);
        

        result.pipe(fs.createWriteStream(`./image/imagen.png`))
       
    } catch (error) {
        console.error("Error al descargar el archivo:", error);
    }    

}

module.exports = {
    uploadFile,
    getFiles,
    getFileByKey,
    getFileUrl,
    downloadFile
};
