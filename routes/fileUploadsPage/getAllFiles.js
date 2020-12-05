const fs = require('fs/promises')

const getAllFiles = (req, res, next) => {
    res.app.locals.fileUploadStats['totalVisitors']++
    fs.writeFile('./uploadsMetadata/fileUploadStats.json', JSON.stringify(res.app.locals.fileUploadStats), 'utf-8')
    res.status(200).send(res.app.locals.metadata)
}

module.exports = {
    getAllFiles
}