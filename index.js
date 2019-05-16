var timer = require('contimer'),
    TIMER_LABEL = '__response_timer_label__';

/**
 * @param {String} [label] Contimer timer label
 * @param {Function} cb function(time: Number, req: http.IncomingMessage)
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
            .on('finish', onFinish)
            .on('close', onClose);

        function onFinish() {
            unbind();

            var timeObj = timerStop();
            cb(timeObj.time, req);
        }

        function onClose() {
            unbind();

            // FIXME: what should we do here?
            cb(0, req);
        }

        function unbind() {
            res
                .removeListener('cancel', onClose)
                .removeListener('finish', onFinish);
        }

        next();
    };
};
