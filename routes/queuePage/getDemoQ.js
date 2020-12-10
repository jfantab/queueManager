const getDemoQ = (req, res) => {
 const allDemoQ = res.app.locals.demoQ.map(obj=>obj["name"]);
 res.status(200).send(allDemoQ);
}

module.exports = {
    getDemoQ
}
