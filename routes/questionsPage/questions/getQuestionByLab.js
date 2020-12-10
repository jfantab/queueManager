const { listQuestionsByLab } = require('../../.././databases/firebase')

const getQuestionByLab = (req, res) => {
    let cur = []

    res.app.locals.questions.forEach(q => {
        if(q.lab === req.params.lab)
            cur.push(q)
    })
    listQuestionsByLab(req)
    res.status(200).send(cur)
}

module.exports = {
    getQuestionByLab
}