const errorHandler = (err, req, res, next) => {
  console.log(err)
  if(err.name == 'SequelizeValidationError') {
    let msg;
    if(err.errors.length) {
      msg = [];
      err.errors.forEach(el => {
        msg.push(el.message);
      })
      return res.status(400).json({ message: msg });
    } else {
      return res.status(400).json({ message: err.error.message })
    }
  }
}

module.exports = {
  errorHandler
}
