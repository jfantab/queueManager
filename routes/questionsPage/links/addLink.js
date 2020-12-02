const addLink = (req, res) => {
    const newLink = {
        link: req.body.link
    }
    res.app.locals.links.push(newLink)
    console.log(res.app.locals.links)
    res.status(200).send("Link added")
}

module.exports = {
    addLink
}