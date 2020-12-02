const fs = require('fs/promises')

const getQuestionsPageStats = (req, res) =>
    fs.readFile('./questionsPageStats.json', { encoding: 'utf-8' })
        .then(data => res.app.locals.questionsPageStats = JSON.parse(data))
        .then(response => res.status(200).send(response))
        .catch(err => console.log(err))

module.exports = {
    getQuestionsPageStats
}