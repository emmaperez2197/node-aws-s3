const express = require('express')

const router = express.Router()

const { handler } = require('../controllers/files/insert')
const { getBucket } = require('../controllers/files/getFiles')
const { bucketByKey } = require('../controllers/files/getFilesByKey')
const { download } = require('../controllers/files/downloadFile')
const { getUrl } = require('../controllers/files/getFileUrl')


router.post('/file',  handler)
router.get('/get-bucket',  getBucket)
router.get('/get-bucket/:file',  bucketByKey)
router.get('/download/:file',  download)
router.get('/url/:file', getUrl)


module.exports  = { 
    router
}