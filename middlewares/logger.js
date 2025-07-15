module.exports = (req, res, next) => {
  const log = {
    time: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl,
    body: req.body
  };

  global.logs = global.logs || [];
  global.logs.push(log);

  next();
};
