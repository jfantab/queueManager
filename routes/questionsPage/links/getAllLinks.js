const { getLinks } = require('../../.././databases/firebase')

const getAllLinks = (req, res) =>
    getLinks(0)
        .then(data => res.app.locals.links = data)
        .then(response => res.status(200).send(response))
        .catch(err => console.log(err))

module.exports = {
    getAllLinks
}
