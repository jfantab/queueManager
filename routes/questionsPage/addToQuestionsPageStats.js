const addToQuestionsPageStats = (req, res, next) => {
    next()

    if(req.originalUrl.includes("questions")) {
        res.app.locals.questionsPageStats.totalQuestions += 1
        if(req.originalUrl.includes('vote')) {
            res.app.locals.questionsPageStats.totalUpvotes += 1
        }
        else if(req.originalUrl.includes('highlight')) {
            res.app.locals.questionsPageStats.totalHighlights += 1
        }
    }

    if(req.originalUrl.includes("link")) {
        res.app.locals.questionsPageStats.totalLinks++
    }

    console.log(res.app.locals.questionsPageStats)
}

module.exports = {
    addToQuestionsPageStats
}