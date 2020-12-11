const fs = require('fs/promises')
const { listQuestions } = require('../../.././databases/firebase')

const rankQuestions = (data) => {
    data.sort((a, b) => {
        if(a.highlighted) {
            return 1
        }
        else if(b.highlighted) {
            return -1
        }
        else {
            if (a.votes < b.votes)
                return 1
            else if (a.votes > b.votes)
                return -1
            else
                return 0
        }
    })

    return data
}

const getAllQuestions = (req, res) => {
    listQuestions(0)
        .then(data => res.app.locals.questions = data)
        .then(data => rankQuestions(data))
        .then(response => res.status(200).send(response))
}

module.exports = {
    getAllQuestions
}

