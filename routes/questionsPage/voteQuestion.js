const voteQuestion = (req, res) => {
    res.app.locals.questions.forEach(q => {
        if(q.id === req.params.id)
            q.votes = parseInt(req.body.votes) + 1
    })
    console.log(res.app.locals.questions)
    res.status(200).send("Vote updated")
}

module.exports = {
    voteQuestion
}