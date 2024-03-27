
const { getFileByKey } = require('../../../s3')

const bucketByKey = async (req, res) => {


    const { folder, file } = req.params

    // const path = `${folder}/${file}`

    console.log(file)
    const result = await getFileByKey(file);

    return res.json(result)
}


module.exports = {
    bucketByKey
}