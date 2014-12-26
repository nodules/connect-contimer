var connect = require('connect'),
    timer = require('../'),
    app = connect();

function logResponseTime(time, req) {
    console.log('Response processing time for %s took %s ms', req.url, time);
}

app
    .use(timer(logResponseTime))
    .use(function(req, res, next) {
        var timeout = Math.max(100, Math.random() * 500 | 0);
        setTimeout(function() {
            res.end('done!');
            next();
        }, timeout);
    })
    .listen(process.env.npm_package_config_port);
