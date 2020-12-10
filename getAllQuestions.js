const fs = require('fs/promises')
const { listQuestions } = require('../../databases/firebase')

const rankQuestions = (data) => {
    data.sort((a, b) => {
        if (a.votes < b.votes)
            return 1
        else if (a.votes > b.votes)
            return -1
        else
            return 0
    })

    return data
}

const getAllQuestions = (req, res) => {
    fs.readFile('./questions.json', { encoding: 'utf-8' })
        .then(data => res.app.locals.questions = JSON.parse(data))
        .then(data => rankQuestions(data))
        .then(response => res.status(200).send(response))
        listQuestions(0)
}

module.exports = {
    getAllQuestions
}

