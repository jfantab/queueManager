const { listQuestionsByLab } = require('../../.././databases/firebase')

const getQuestionByLab = (req, res) => {
    let cur = []
    res.app.locals.questions.forEach(q => {
        if(q.lab === req.params.lab)
            cur.push(q)
    })
    listQuestionsByLab(req.params.lab)
    res.status(200).send(cur)
        .catch(err => console.log(err))
}

module.exports = {
    getQuestionByLab
}