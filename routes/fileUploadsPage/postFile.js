const postFile = (req, res, next) => {
    res.app.locals.metadata[req.file.filename] = req.file
    fs.writeFile('./uploadsMetadata/metadata.json', JSON.stringify(res.app.locals.metadata), 'utf-8')
    res.redirect('http://localhost:8080/html/fileUploads.html')
}

module.exports = {
    postFile
}