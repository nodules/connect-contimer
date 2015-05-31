var timer = require('contimer'),
    TIMER_LABEL = '__response_timer_label__';

module.exports = function requestTimeMiddleware(cb) {
    return function(req, res, next) {
        var timerStop = timer.start({}, TIMER_LABEL);

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
