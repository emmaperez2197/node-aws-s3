
const { getFileUrl} = require('../../../s3')

const getUrl = async (req, res) =>{

    const { folder, file } = req.params

    // const path = `${folder}/${file}`

const result = await getFileUrl(file);

    res.json( { url: result } );
}


module.exports = {
   getUrl
}