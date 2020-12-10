const urlArray = ['/queueStats', '/questionsPageStats', '/fileUploadStats']

const populateQStats = (data) => {
    document.getElementById("questionWait").innerHTML = (data["questionStats"]["averageWait"] / (1000 * 60)).toFixed(2);
    document.getElementById("demoWait").innerHTML = (data["demoStats"]["averageWait"] / (1000 * 60)).toFixed(2);
    document.getElementById("demoTime").innerHTML = (data["demoStats"]["averageDemo"] / (1000 * 60)).toFixed(2);
    document.getElementById("questionTime").innerHTML = (data["questionStats"]["averageQuestion"] / (1000 * 60)).toFixed(2);
    document.getElementById("questionTotal").innerHTML = data["questionStats"]["total"];
    document.getElementById("demoTotal").innerHTML = data["demoStats"]["total"];
}

const populateQuestionPageStats = (data) => {
    document.getElementById("totalQuestions").textContent = data.totalQuestions
    document.getElementById("totalLinks").textContent = data.totalLinks
    document.getElementById("totalUpvotes").textContent = data.totalUpvotes
    document.getElementById("totalHighlights").textContent = data.totalHighlights
}

const populateFilePageStats = (data) => {
  document.getElementById("filesUploaded").textContent = data.filesUploaded
  document.getElementById("avgFileSize").textContent = data.averageFileSize
  document.getElementById("totalVisitors").textContent = data.totalVisitors
  document.getElementById("filesDownloaded").textContent = data.filesDownloaded
}

const main = () => {
    const promises = urlArray.map(url => fetch(url))
    Promise.all(promises)
        .then(responses => Promise.all(responses.map(r => r.json())))
        .then(responses => [...responses])
        .then(responses => {
            let [queueStats, questionPageStats, fileUploadStats] = responses
            populateQStats(queueStats);
            populateQuestionPageStats(questionPageStats)
            populateFilePageStats(fileUploadStats)
        })
}

main();
