const fs = require('fs/promises');

const addToQuestionQ = (req, res) => {
    const questionName = req.body["name"];
    console.log("Adding " + questionName + " to the question queue");

    if(questionName != null){
        res.app.locals.questionQ.push(questionName);
        console.log("New Question Queue is:")
        console.log(res.app.locals.questionQ);
        fs.writeFile("./questionQ.json", JSON.stringify(res.app.locals.questionQ));
        res.status(200).send("ok");
    }else{
        res.status(400).send("bad request");
    }
}

module.exports = {
    addToQuestionQ
}
