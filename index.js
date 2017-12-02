var timer = require('contimer'),
    TIMER_LABEL = '__response_timer_label__';

/**
 * @param {String} [label] Contimer timer label
 * @param {Function} callback function(time: Number, req: http.IncomingMessage)
 * @returns {Function} Middleware function(req: http.IncomingMessage, res: http.ServerResponse)
 */
module.exports = function requestTimeMiddleware(label, cb) {
    if (typeof label === 'function') {
        cb = label;
        label = TIMER_LABEL;
    }

    return function(req, res, next) {
        var timerStop = timer.start({}, label);

        res
            // @see https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_event_close_1
            .once('close', onClose)
            // @see https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_event_finish
            .once('finish', onFinish);

        function onFinish() {
            clearEvents();

            var timeObj = timerStop();
            cb(timeObj.time, req);
        }

        function onClose() {
            clearEvents();

            // FIXME: what should we do here?
            cb(0, req);
        }

        function clearEvents() {
            res
                .removeListener('close', onClose)
                .removeListener('finish', onFinish);
        }

        next();
    };
};
