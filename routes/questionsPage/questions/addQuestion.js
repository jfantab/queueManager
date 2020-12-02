const addQuestion = (req, res) => {
    const newQuestion = {
        name: req.body["name"],
        lab: req.body["lab"],
        id: req.params.id,
        question: req.body["questions"],
        votes: 0,
        highlighted: false
    }
    res.app.locals.questions.push(newQuestion)
    console.log(res.app.locals.questions)
    res.status(200).send(newQuestion)
}

module.exports = {
    addQuestion
}