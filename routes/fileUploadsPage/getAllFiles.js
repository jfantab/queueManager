const getAllFiles = (req, res, next) => {
    res.status(200).send(res.app.locals.metadata)
}

module.exports = {
    getAllFiles
}