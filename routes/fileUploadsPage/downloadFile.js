const downloadFile = (req, res, next) => {
    const fileName = req.path.split("/")[2]
    res.status(200).download(`./uploads/${fileName}`)
}

module.exports = {
    downloadFile
}