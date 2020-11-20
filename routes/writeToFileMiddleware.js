const fs = require('fs/promises')

const writeToFileMiddleware = (req, res, next) => {
    next()

    fs.writeFile('./questions.json', JSON.stringify(res.app.locals.questions))

}

module.exports = {
    writeToFileMiddleware
}