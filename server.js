const express = require('express')
const PORT = 8080
const fs = require('fs/promises')

const { getAllQuestions } = require('./routes/questionsPage/getAllQuestions')
const { getQuestionByLab } = require('./routes/questionsPage/getQuestionByLab')
const { addQuestion } = require('./routes/questionsPage/addQuestion')
const { voteQuestion } = require('./routes/questionsPage/voteQuestion')

const { writeToFileMiddleware } = require('./routes/writeToFileMiddleware')

const { getAllFiles } = require('./routes/fileUploadsPage/getAllFiles')
const { postFile } = require('./routes/fileUploadsPage/postFile')
const { downloadFile } = require('./routes/fileUploadsPage/downloadFile')

//
//  Do "npm install multer" in terminal to install multer
//
const multer = require('multer')
let storeLoc = multer.diskStorage({
    destination: function (req, file, cb){
        cb (null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb (null, file.originalname)
    }
})

//
//  Set up the server
//
const main = () => {

    const app = express()
    let upload = multer({storage: storeLoc})

    app.locals.questions = []

    app.use(express.json())
    app.use(express.static("src"))
    app.get("/getAllFiles", getAllFiles)
    app.post("/html/fileUploads.html", upload.single('upload'), postFile)
    app.get("/downloadFile/:filename", downloadFile)

    app.get('/questions', getAllQuestions)
    app.get('/questions/:lab', getQuestionByLab)

    app.post('/questions/:id', writeToFileMiddleware, addQuestion)
    app.post('/questions/vote/:id', writeToFileMiddleware, voteQuestion)
  
  fs.readFile("./uploadsMetadata/metadata.json", "utf-8")
        .then((fileContents) => JSON.parse(fileContents))
        .then((data) => {
            app.locals.metadata = data
        })

    app.listen(PORT, (err) => {
        if(err) {
            console.log(err)
            process.exit(1)
        }

        console.log(`Server is listening on port ${PORT}`)
    })

}

main()