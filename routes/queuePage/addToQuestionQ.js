const fs = require('fs/promises');

const addToQuestionQ = (req, res) => {
    const questionName = req.body["name"];
    console.log("Adding " + questionName + " to the question queue");
    let date = new Date();
    let time = date.getTime();
    let object = {
      name:questionName,
      time:time
    }

    if (res.app.locals.questionQ.length == 0){
      res.app.locals.queueStats.questionStats.lastQuestion = time;
      fs.writeFile("./queueStats.json", JSON.stringify(res.app.locals.queueStats));
    }

    if(questionName != null){
        res.app.locals.questionQ.push(object);
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
