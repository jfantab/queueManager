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
const {removeQuestion} = require('./routes/questionsPage/questions/removeQuestion')

const {addToQuestionsPageStats} = require('./routes/questionsPage/addToQuestionsPageStats')
const {getQuestionsPageStats} = require('./routes/questionsPage/getQuestionsPageStats')

const {getAllLinks} = require('./routes/questionsPage/links/getAllLinks')
const {addLink} = require('./routes/questionsPage/links/addLink')

const {writeToFileMiddleware} = require('./routes/writeToFileMiddleware')

const { getAllFiles } = require('./routes/fileUploadsPage/getAllFiles')
const { postFile } = require('./routes/fileUploadsPage/postFile')
const { downloadFile } = require('./routes/fileUploadsPage/downloadFile')
const { getFileUploadStats } = require('./routes/fileUploadsPage/getFileUploadStats')

const { getDemoQ } = require('./routes/queuePage/getDemoQ')
const { getQuestionQ } = require('./routes/queuePage/getQuestionQ')
const { addToDemoQ } = require('./routes/queuePage/addToDemoQ')
const { addToQuestionQ } = require('./routes/queuePage/addToQuestionQ')
const { deleteDemo } = require('./routes/queuePage/deleteDemo')
const { deleteQuestion } = require('./routes/queuePage/deleteQuestion')
const { getQueueStats } = require('./routes/queuePage/getQueueStats')

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
    app.locals.questionsPageStats = {}

    app.locals.demoQ = []
    app.locals.questionQ = []
    app.locals.queueStats = {}

    app.use(express.json())
    app.use(express.static("static"))

    app.get("/getAllFiles", getAllFiles)
    app.post("/html/fileUploads.html", upload.single('upload'), postFile)
    app.get("/downloadFile/:filename", downloadFile)
    app.get("/fileUploadStats", getFileUploadStats)

    app.get('/questions', getAllQuestions)
    app.get('/questions/:lab', getQuestionByLab)

    app.get('/questionsPageStats', getQuestionsPageStats)

    app.get('/html', emitError)

    app.post('/questions/:id', addToQuestionsPageStats, writeToFileMiddleware, addQuestion)
    app.post('/questions/vote/:id', addToQuestionsPageStats, writeToFileMiddleware,  voteQuestion)
    app.post('/questions/highlight/:id', addToQuestionsPageStats, writeToFileMiddleware, highlightQuestion)

    app.delete('/questions/remove/:id', writeToFileMiddleware, removeQuestion)

    app.get('/links', getAllLinks)

    app.post('/links', writeToFileMiddleware, addToQuestionsPageStats, addLink)

    app.use(handleError)

    fs.readFile("./uploadsMetadata/metadata.json", "utf-8")
        .then((fileContents) => JSON.parse(fileContents))
        .then((data) => {
            app.locals.metadata = data
        })

    fs.readFile("./uploadsMetadata/fileUploadStats.json", "utf-8")
        .then((fileContents) => JSON.parse(fileContents))
        .then((data) => {
            app.locals.fileUploadStats = data
        })

    fs.readFile("./questionsPageStats.json", "utf-8")
        .then((data) =>
            app.locals.questionsPageStats = JSON.parse(data))

    fs.readFile("./demoQ.json", "utf-8")
      .then((data) =>
        app.locals.demoQ = JSON.parse(data))

    fs.readFile("./questionQ.json", "utf-8")
      .then((data) =>
        app.locals.questionQ = JSON.parse(data))

    fs.readFile("./queueStats.json", "utf-8")
      .then((data) =>
        app.locals.queueStats = JSON.parse(data))

    app.get('/demoQ', getDemoQ)
    app.get('/questionQ', getQuestionQ)
    app.get('/queueStats', getQueueStats)

    app.post('/demoQ', addToDemoQ)
    app.post('/questionQ', addToQuestionQ)
    app.post('/demoQD', deleteDemo)
    app.post('/questionQD', deleteQuestion)


    app.listen(PORT, (err) => {
        if (err) {
            console.log(err)
            process.exit(1)
        }

        console.log(`Server is listening on port ${PORT}`)
    })

}

main()
