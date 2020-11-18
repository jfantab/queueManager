const addQuestion = (req, res) => {
    res.app.locals.questions.push(req.body["questions"])
    console.log(res.app.locals.questions)
    res.status(200).send("New question added")
}

module.exports = {
    addQuestion
}