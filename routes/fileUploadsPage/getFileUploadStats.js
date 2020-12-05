const getFileUploadStats = (req, res) => {
    res.status(200).send(res.app.locals.fileUploadStats)
}

module.exports = {
    getFileUploadStats
}