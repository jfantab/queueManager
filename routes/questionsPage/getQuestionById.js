const getQuestionById = (req, res) => {
    let cur = {}

    res.app.locals.questions.forEach(q => {
        if(q.id === req.params.id)
            cur = q
    })

    res.status(200).send(cur)
}

module.exports = {
    getQuestionById
}