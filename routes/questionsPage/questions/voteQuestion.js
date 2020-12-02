const voteQuestion = (req, res) => {
    let cur = {}
    res.app.locals.questions.forEach(q => {
        if(q.id === req.params.id) {
            cur = q
            q.votes = parseInt(req.body.votes) + 1
        }
    })
    console.log(cur)
    res.status(200).send(cur)
}

module.exports = {
    voteQuestion
}