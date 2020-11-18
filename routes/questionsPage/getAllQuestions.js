const getAllQuestions = (req, res) =>
    res.status(200).send(res.app.locals.questions)

module.exports = {
    getAllQuestions
}

