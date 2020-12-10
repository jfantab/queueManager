const getQueueStats = (req, res) => {
  const allStats = res.app.locals.queueStats;
  res.status(200).send(allStats);
}

module.exports = {
    getQueueStats
}
