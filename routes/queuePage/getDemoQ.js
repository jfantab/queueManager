const getDemoQ = (req, res) => {
 const allDemoQ = res.app.locals.demoQ;
 res.status(200).send(allDemoQ);
}

module.exports = {
    getDemoQ
}
