const addQuestion = (req, res) => {
    const newQuestion = {
        name: req.body["name"],
        id: req.params.id,
        question: req.body["questions"],
        votes: 0
    }
    res.app.locals.questions.push(newQuestion)
    res.status(200).send("New question added")
}

module.exports = {
    addQuestion
}