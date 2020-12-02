const handleError = (err, req, res, next) => {
    res.status(400).send("Oops, something went wrong!")
}

module.exports = {
    handleError
}