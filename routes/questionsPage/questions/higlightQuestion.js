const highlightQuestion = (req, res) => {
    let cur = {}
    res.app.locals.questions.forEach(q => {
        if(q.id === req.params.id) {
            cur = q
            q.highlighted = req.body.highlighted
        }
    })
    console.log(res.app.locals.questions)
    res.status(200).send({highlighted: req.body.highlighted})
}

module.exports = {
    highlightQuestion
}