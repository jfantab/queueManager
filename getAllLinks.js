const { } = require('../../../databases/firebase')

const fs = require('fs/promises')

const getAllLinks = (req, res) =>
    getAllLinks(0)
        .then(data => res.app.locals.links = JSON.parse(data))
        .then(response => res.status(200).send(response))
        .catch(err => console.log(err))

module.exports = {
    getAllLinks
}