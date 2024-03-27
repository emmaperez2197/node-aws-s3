
const {getFiles} = require('../../../s3')

const getBucket = async (req, res) =>{

 const result = await getFiles();

    res.json({result});
}


module.exports = {
    getBucket
}