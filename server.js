const express = require('express')
const PORT = 8080

const { getAllQuestions } = require('./routes/questionsPage/getAllQuestions')
const { addQuestion } = require('./routes/questionsPage/addQuestion')

const main = () => {

    const app = express()
    app.locals.questions = []

    app.use(express.json())
    app.use(express.static("src"))

    app.get('/questions', getAllQuestions)
    app.post('/questions', addQuestion)

    app.listen(PORT, (err) => {
        if(err) {
            console.log(err)
            process.exit(1)
        }

        console.log(`Server is listening on port ${PORT}`)
    })

}

main()