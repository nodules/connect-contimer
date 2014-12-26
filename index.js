var timer = require('contimer'),
    TIMER_LABEL = '__response_timer_label__';

module.exports = function requestTimeMiddleware(cb) {
    return function(req, res, next) {
        timer.start(req, TIMER_LABEL);

        res
            .on('finish', onFinish)
            .on('cancel', onCancel);

        function onFinish() {
            var timeObj = timer.stop(req, TIMER_LABEL);
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
