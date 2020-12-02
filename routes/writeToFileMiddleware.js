const fs = require('fs/promises')

const writeToFileMiddleware = (req, res, next) => {
    next()

    if(req.originalUrl.includes("questions"))
        fs.writeFile('./questions.json', JSON.stringify(res.app.locals.questions))

    if(req.originalUrl.includes("links"))
        fs.writeFile('./links.json', JSON.stringify(res.app.locals.links))

    fs.writeFile('./questionsPageStats.json', JSON.stringify(res.app.locals.questionsPageStats))
}

module.exports = {
    writeToFileMiddleware
}