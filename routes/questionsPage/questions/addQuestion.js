const { writeQuestion } = require('../../.././databases/firebase')

const addQuestion = (req, res) => {
    const newQuestion = {
        name: req.body["name"],
        lab: req.body["lab"],
        id: req.params.id,
        question: req.body["questions"],
        votes: 0
    }
    writeQuestion(newQuestion)
        .then(() => res.status(200).send(newQuestion))
}

module.exports = {
    addQuestion
}

