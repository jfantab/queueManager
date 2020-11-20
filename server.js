const express = require('express')
const PORT = 8080

const { getAllQuestions } = require('./routes/questionsPage/getAllQuestions')
const { getQuestionById } = require('./routes/questionsPage/getQuestionById')
const { addQuestion } = require('./routes/questionsPage/addQuestion')
const { voteQuestion } = require('./routes/questionsPage/voteQuestion')

const { writeToFileMiddleware } = require('./routes/writeToFileMiddleware')

const main = () => {

    const app = express()
    app.locals.questions = []

    app.use(express.json())
    app.use(express.static("src"))

    app.get('/questions', getAllQuestions)
    app.get('/questions/:id', getQuestionById)

    app.post('/questions/:id', writeToFileMiddleware, addQuestion)
    app.post('/questions/vote/:id', writeToFileMiddleware, voteQuestion)

    app.listen(PORT, (err) => {
        if(err) {
            console.log(err)
            process.exit(1)
        }

        console.log(`Server is listening on port ${PORT}`)
    })

}

main()