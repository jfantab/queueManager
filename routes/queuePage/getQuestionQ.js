const getQuestionQ = (req, res) => {
  const allQuestionQ = res.app.locals.questionQ.map(obj=>obj["name"]);

  res.status(200).send(allQuestionQ);
}

module.exports = {
    getQuestionQ
}
