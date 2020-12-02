const fs = require('fs/promises')

const writeToFileMiddleware = (req, res, next) => {
    next()

    if(req.body["questions"])
        fs.writeFile('./questions.json', JSON.stringify(res.app.locals.questions))

    if(req.body["link"])
        fs.writeFile('./links.json', JSON.stringify(res.app.locals.links))
}

module.exports = {
    writeToFileMiddleware
}