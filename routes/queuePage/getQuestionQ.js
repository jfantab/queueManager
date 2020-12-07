const getQuestionQ = (req, res) => {
  const allQuestionQ = res.app.locals.questionQ;
  res.status(200).send(allQuestionQ);
}

module.exports = {
    getQuestionQ
}
