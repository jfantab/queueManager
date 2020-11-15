const express = require('express')
const PORT = 8080

const main = () => {

    const app = express()

    app.use(express.json())
    app.use(express.static("src"))



    app.listen(PORT, (err) => {
        if(err) {
            console.log(err)
            process.exit(1)
        }

        console.log(`Server is listening on port ${PORT}`)
    })

}

main()