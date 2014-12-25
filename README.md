connect-contimer
================

## Usage

~~~js
var connect = require('connect'),
    timer = require('connect-contimer'),
    app = connect();

app.use(timer(function(err, req, time) {
    console.log('Response processing time %s ms', time);
}));
···
~~~

## API

## License

MIT

## Bugs

See https://github.com/nodules/connect-contimer/issues.
