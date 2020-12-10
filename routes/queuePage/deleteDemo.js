const fs = require('fs/promises');

const deleteDemo = (req, res) => {
  const demoName = req.body["name"];
    let locals = res.app.locals;
   	console.log("Deleting " + demoName + " from the demo queue");
    locals.queueStats.totalEntries += 1;
    locals.queueStats.demoStats.total += 1;
    const date = new Date();
    const time = date.getTime();

  	if(demoName != null){
      if(locals.demoQ != null){
        index = locals.demoQ.map(obj=>obj["name"]).indexOf(demoName);
        console.log(locals.demoQ[index])
        if (locals.queueStats.demoStats.averageWait == 0){
          locals.queueStats.demoStats.averageWait = time - locals.demoQ[index]["time"];
        }else{
          locals.queueStats.demoStats.averageWait = (locals.queueStats.demoStats.averageWait + (time - locals.demoQ[index]["time"]))/2;
        }
        if (locals.queueStats.demoStats.averageDemo == 0){
          locals.queueStats.demoStats.averageDemo = time - locals.queueStats.demoStats.lastDemo;
        }else{
          locals.queueStats.demoStats.averageDemo = (locals.queueStats.demoStats.averageDemo + (time - locals.queueStats.demoStats.lastDemo))/2;
        }
        delete locals.demoQ[index]
        locals.demoQ = locals.demoQ.filter(function (el) {
            return el != null;
          });
        locals.queueStats.demoStats.lastDemo = time;
      }
      	console.log("New Demo Queue is:")
      	console.log(locals.demoQ);
        fs.writeFile("./demoQ.json", JSON.stringify(locals.demoQ))
        fs.writeFile("./queueStats.json", JSON.stringify(locals.queueStats));
      	res.status(200).send("ok");

    }else{
        res.status(400).send("bad request");
    }
}

module.exports = {
    deleteDemo
}
