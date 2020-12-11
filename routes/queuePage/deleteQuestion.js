const fs = require('fs/promises');

const deleteQuestion = (req, res) => {
  const questionName = req.body["name"];
    let locals = res.app.locals;
   	console.log("Deleting " + questionName + " from the question queue");
    locals.queueStats.totalEntries += 1;
    locals.queueStats.questionStats.total += 1;
    const date = new Date();
    const time = date.getTime();


  	if(questionName != null){
      if(locals.questionQ != null){
        index =  locals.questionQ.map(obj=>obj["name"]).indexOf(questionName);
        if (locals.queueStats.questionStats.averageWait == 0){
          locals.queueStats.questionStats.averageWait = time - locals.questionQ[index]["time"];
        }else{
          locals.queueStats.questionStats.averageWait = (locals.queueStats.questionStats.averageWait + (time - locals.questionQ[index]["time"]))/2;
        }
        if (locals.queueStats.questionStats.averageQuestion == 0){
          locals.queueStats.questionStats.averageQuestion = time - locals.queueStats.questionStats.lastQuestion;
        }else{
          locals.queueStats.questionStats.averageQuestion = (locals.queueStats.questionStats.averageQuestion + (time - locals.queueStats.questionStats.lastQuestion))/2;
        }
        delete locals.questionQ[index];
        locals.questionQ = locals.questionQ.filter(function (el) {
            return el != null;
          });
        locals.queueStats.questionStats.lastQuestion = time;

      }
      	console.log("New Question Queue is:")
      	console.log(locals.questionQ);
        fs.writeFile("./questionQ.json", JSON.stringify(locals.questionQ));
        fs.writeFile("./queueStats.json", JSON.stringify(locals.queueStats));
      	res.status(200).send("ok");

    }else{
        res.status(400).send("bad request");
    }
    fs.writeFile("./queueStats.json", JSON.stringify(locals.queueStats));
}

module.exports = {
    deleteQuestion
}
