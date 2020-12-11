const fs = require('fs/promises')

const writeToFileMiddleware = (req, res, next) => {
    next()

    fs.writeFile('./questionsPageStats.json', JSON.stringify(res.app.locals.questionsPageStats))
}

module.exports = {
    writeToFileMiddleware
}