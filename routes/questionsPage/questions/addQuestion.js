const { writeQuestion } = require('../../.././databases/firebase')

const addQuestion = (req, res) => {
    const newQuestion = {
        name: req.body["name"],
        lab: req.body["lab"],
        id: req.params.id,
        question: req.body["questions"],
        highlighted: false,
        votes: 0
    }
    console.log(newQuestion)
    writeQuestion(newQuestion)
        .then(() => res.status(200).send(newQuestion))
        .catch(() => res.sendStatus(500))
}

module.exports = {
    addQuestion
}

