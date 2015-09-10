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
            .on('finish', onFinish)
            .on('cancel', onCancel);

        function onFinish() {
            var timeObj = timerStop();
            cb(timeObj.time, req);
        }

        function onCancel() {
            res
                .removeListener('cancel', onCancel)
                .removeListener('finish', onFinish);

            // FIXME: what should we do here?
            cb(0, req);
        }

        next();
    };
};
