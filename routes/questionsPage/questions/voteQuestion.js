const { updateQuestion } = require('../../.././databases/firebase')

const voteQuestion = (req, res) => {
    let cur = {}
    res.app.locals.questions.forEach(q => {
        if(q.id === req.params.id) {
            cur = q
            q.votes = parseInt(req.body.votes) + 1
        }
    })
    console.log(res.app.locals.questions)
    res.status(200).send("Vote updated")
    updateQuestion(cur.id, cur.votes)
}

module.exports = {
    voteQuestion
}