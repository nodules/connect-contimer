connect-contimer
================

## Usage

~~~js
var connect = require('connect'),
    timer = require('connect-contimer'),
    app = connect();

app.use(timer(function(time, req) {
    console.log('Response processing time %s ms', time);
}));
···
~~~

## API

TODO: describe API of the module

## License

MIT

## Bugs

See https://github.com/nodules/connect-contimer/issues.
