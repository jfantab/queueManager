const express = require('express')
const PORT = 8080

//
//  Do "npm install formidable" in terminal to install multer
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
    console.log(req.file)
    console.log(req.body)
    res.redirect('http://localhost:8080/html/fileUploads.html')
}

//
//  Set up the server
//
const main = () => {

    const app = express()
    let upload = multer({storage: storeLoc})

    app.use(express.json())
    app.use(express.static("src"))
    app.post("/html/fileUploads.html", upload.single('upload'), postFile)


    app.listen(PORT, (err) => {
        if(err) {
            console.log(err)
            process.exit(1)
        }

        console.log(`Server is listening on port ${PORT}`)
    })

}

main()