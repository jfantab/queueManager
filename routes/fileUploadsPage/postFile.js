const fs = require('fs/promises')

const postFile = (req, res, next) => {
    res.app.locals.metadata[req.file.filename] = req.file
    res.app.locals.fileUploadStats["filesUploaded"]++
    
    let total = 0
    let num = 0
    for (const [key, value] of Object.entries(res.app.locals.metadata)){
        total = total + value['size']
        num = num + 1
    }
    res.app.locals.fileUploadStats["averageFileSize"] = total/num

    fs.writeFile('./uploadsMetadata/fileUploadStats.json', JSON.stringify(res.app.locals.fileUploadStats), 'utf-8')
    fs.writeFile('./uploadsMetadata/metadata.json', JSON.stringify(res.app.locals.metadata), 'utf-8')
    res.redirect('http://localhost:8080/html/fileUploads.html')
}

module.exports = {
    postFile
}