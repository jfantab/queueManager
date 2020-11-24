const express = require('express')
const PORT = 8080
const fs = require('fs/promises')

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
//  Handle a file being uploaded to the server
//
const postFile = (req, res, next) => {
    res.app.locals.metadata[req.file.filename] = req.file
    fs.writeFile('./uploadsMetadata/metadata.json', JSON.stringify(res.app.locals.metadata), 'utf-8')
    res.redirect('http://localhost:8080/html/fileUploads.html')
}

//
//  Handle loading file database
//
const getAllFiles = (req, res, next) => {
    res.status(200).send(res.app.locals.metadata)
}

const downloadFile = (req, res, next) => {
    const fileName = req.path.split("/")[2]
    res.status(200).download(`./uploads/${fileName}`)
}

//
//  Set up the server
//
const main = () => {

    const app = express()
    let upload = multer({storage: storeLoc})

    app.use(express.json())
    app.use(express.static("src"))
    app.get("/getAllFiles", getAllFiles)
    app.post("/html/fileUploads.html", upload.single('upload'), postFile)
    app.get("/downloadFile/:filename", downloadFile)

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