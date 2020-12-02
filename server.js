const express = require('express')
const PORT = 8080
const fs = require('fs/promises')

const {emitError} = require('./routes/emitError')
const {handleError} = require('./routes/handleError')

const {getAllQuestions} = require('./routes/questionsPage/questions/getAllQuestions')
const {getQuestionByLab} = require('./routes/questionsPage/questions/getQuestionByLab')
const {addQuestion} = require('./routes/questionsPage/questions/addQuestion')
const {voteQuestion} = require('./routes/questionsPage/questions/voteQuestion')
const {highlightQuestion} = require('./routes/questionsPage/questions/higlightQuestion')

const {addToQuestionsPageStats} = require('./routes/questionsPage/addToQuestionsPageStats')
const {getQuestionsPageStats} = require('./routes/questionsPage/getQuestionsPageStats')

const {getAllLinks} = require('./routes/questionsPage/links/getAllLinks')
const {addLink} = require('./routes/questionsPage/links/addLink')

const {writeToFileMiddleware} = require('./routes/writeToFileMiddleware')

const { getAllFiles } = require('./routes/fileUploadsPage/getAllFiles')
const { postFile } = require('./routes/fileUploadsPage/postFile')
const { downloadFile } = require('./routes/fileUploadsPage/downloadFile')

//
//  Do "npm install multer" in terminal to install multer
//
const multer = require('multer')
let storeLoc = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

//
//  Set up the server
//
const main = () => {

    const app = express()
    let upload = multer({storage: storeLoc})

    app.locals.questions = []
    app.locals.links = []

    app.locals.questionsPageStats = {
        totalQuestions: 4,
        totalLinks: 3,
        totalUpvotes: 6,
        totalHighlights: 1
    }

    app.use(express.json())
    app.use(express.static("src"))

    app.get("/getAllFiles", getAllFiles)
    app.post("/html/fileUploads.html", upload.single('upload'), postFile)
    app.get("/downloadFile/:filename", downloadFile)

    app.get('/questions', getAllQuestions)
    app.get('/questions/:lab', getQuestionByLab)

    app.get('/questionsPageStats', getQuestionsPageStats)

    app.post('/questions/:id', addToQuestionsPageStats, writeToFileMiddleware, addQuestion)
    app.post('/questions/vote/:id', addToQuestionsPageStats, writeToFileMiddleware,  voteQuestion)
    app.post('/questions/highlight/:id', addToQuestionsPageStats, writeToFileMiddleware, highlightQuestion)

    app.get('/links', getAllLinks)

    app.post('/links', writeToFileMiddleware, addToQuestionsPageStats, addLink)

    fs.readFile("./uploadsMetadata/metadata.json", "utf-8")
        .then((fileContents) => JSON.parse(fileContents))
        .then((data) => {
            app.locals.metadata = data
        })

    fs.readFile("./questionsPageStats.json", "utf-8")
        .then((data) =>
            app.locals.questionsPageStats = JSON.parse(data))

    app.listen(PORT, (err) => {
        if (err) {
            console.log(err)
            process.exit(1)
        }

        console.log(`Server is listening on port ${PORT}`)
    })

}

main()