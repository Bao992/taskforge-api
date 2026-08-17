function logger(req, res, next) {
    console.log(
        `${new Date().toString()} | ${req.method} | ${req.path}`
    );

    next();
}

module.exports = logger;