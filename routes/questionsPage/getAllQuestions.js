const fs = require('fs/promises')

const getAllQuestions = (req, res) => {
    fs.readFile('./questions.json', { encoding: 'utf-8' })
        .then(data => res.app.locals.questions = JSON.parse(data))
        .then(response => res.status(200).send(response))
}

module.exports = {
    getAllQuestions
}

