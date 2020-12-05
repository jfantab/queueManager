const fs = require('fs/promises');

const deleteQuestion = (req, res) => {
  const questionName = req.body["name"];
   	console.log("Deleting " + questionName + " from the question queue");

  	if(questionName != null){
      if(res.app.locals.questionQ != null){
        index =  res.app.locals.questionQ.indexOf(questionName);
        delete res.app.locals.questionQ[index];
        res.app.locals.questionQ = res.app.locals.questionQ.filter(function (el) {
            return el != null;
          });
      }
      	console.log("New Question Queue is:")
      	console.log(res.app.locals.questionQ);
        fs.writeFile("./questionQ.json", JSON.stringify(res.app.locals.questionQ));
      	res.status(200).send("ok");

    }else{
        res.status(400).send("bad request");
    }
}

module.exports = {
    deleteQuestion
}
