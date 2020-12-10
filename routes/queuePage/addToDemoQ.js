const fs = require('fs/promises');

const addToDemoQ = (req, res) => {
  const demoName = req.body["name"];
   	console.log("Adding " + demoName + " to the demo queue");
    let date = new Date();
    let time = date.getTime();
    let object = {
      name:demoName,
      time:time
    }

    if (res.app.locals.demoQ.length == 0){
      res.app.locals.queueStats.demoStats.lastDemo = time;
      fs.writeFile("./queueStats.json", JSON.stringify(res.app.locals.queueStats));
    }

  	if(demoName != null){
      	res.app.locals.demoQ.push(object);

      	console.log("New Demo Queue is:")
      	console.log(res.app.locals.demoQ);
        fs.writeFile("./demoQ.json", JSON.stringify(res.app.locals.demoQ));
      	res.status(200).send("ok");

    }else{
        res.status(400).send("bad request");
    }
}

module.exports = {
    addToDemoQ
}
