
const {uploadFile} = require('../../../s3')

const handler = async (req, res) =>{

 const result = await uploadFile(req.files.file);

    res.json({result})
}


module.exports = {
    handler
}