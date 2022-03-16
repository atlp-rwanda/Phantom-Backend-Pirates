const express = require('express')
const imageController = require('../controllers/imageController')
const imageUploader = require('../../helpers/image-uploader')

const router = express.Router()

router.post('/upload', imageUploader.upload.single('image'), imageController.upload)

module.exports = router
