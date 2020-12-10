const queueStatURL = new URL("http://"+location.host+"/queueStats");
const populateQStats = (data) => {
  document.getElementById("questionWait").innerHTML = (data["questionStats"]["averageWait"] / (1000*60)).toFixed(2) ;
  document.getElementById("demoWait").innerHTML = (data["demoStats"]["averageWait"] / (1000*60)).toFixed(2);
  document.getElementById("demoTime").innerHTML = (data["demoStats"]["averageDemo"] / (1000*60)).toFixed(2);
  document.getElementById("questionTime").innerHTML = (data["questionStats"]["averageQuestion"] / (1000*60)).toFixed(2);
  document.getElementById("questionTotal").innerHTML = data["questionStats"]["total"];
  document.getElementById("demoTotal").innerHTML = data["demoStats"]["total"];
}
const main = () => {
  fetch(queueStatURL)
    .then(response => response.json())
    .then(data => {
      populateQStats(data);
    });
}

main();
