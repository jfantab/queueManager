const fs = require('fs/promises')

const downloadFile = (req, res, next) => {
    res.app.locals.fileUploadStats["filesDownloaded"]++
    fs.writeFile('./uploadsMetadata/fileUploadStats.json', JSON.stringify(res.app.locals.fileUploadStats), 'utf-8')
    const fileName = req.path.split("/")[2]
    res.status(200).download(`./uploads/${fileName}`)
}

module.exports = {
    downloadFile
}