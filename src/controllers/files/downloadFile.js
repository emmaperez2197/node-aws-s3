
const {downloadFile} = require('../../../s3')

const download = async (req, res) =>{


    const { folder, file } = req.params

    // const path = `${folder}/${file}`

     await downloadFile(file);

    res.json('todo ok');
}


module.exports = {
    download
}