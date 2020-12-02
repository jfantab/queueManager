const emitError = (req, res) => {
    next(new Error("Oops, something went wrong!"))
}

module.exports = {
    emitError
}