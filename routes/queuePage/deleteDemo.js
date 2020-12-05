const fs = require('fs/promises');

const deleteDemo = (req, res) => {
  const demoName = req.body["name"];
   	console.log("Deleting " + demoName + " from the demo queue");

  	if(demoName != null){
      if(res.app.locals.demoQ != null){
        index =  res.app.locals.demoQ.indexOf(demoName);
        delete res.app.locals.demoQ[index]
        res.app.locals.demoQ = res.app.locals.demoQ.filter(function (el) {
            return el != null;
          });
      }
      	console.log("New Demo Queue is:")
      	console.log(res.app.locals.demoQ);
        fs.writeFile("./demoQ.json", JSON.stringify(res.app.locals.demoQ));
      	res.status(200).send("ok");

    }else{
        res.status(400).send("bad request");
    }
}

module.exports = {
    deleteDemo
}
