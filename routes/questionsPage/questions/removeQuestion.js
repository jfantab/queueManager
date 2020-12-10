const { deleteQuestion } = require('../../.././databases/firebase')

const removeQuestion = (req, res) => {
    res.app.locals.questions =
            res.app.locals.questions.filter(q => q.id !== req.params.id)
    console.log(res.app.locals.questions)
    res.status(200).send(res.app.locals.questions)
    deleteQuestion(req.params.id)
}

module.exports = {
    removeQuestion
}
