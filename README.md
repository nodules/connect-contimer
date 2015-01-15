connect-contimer [![NPM version][npm-image]][npm-link]
================

[![Dependency status][deps-image]][deps-link]

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

[npm-image]: https://img.shields.io/npm/v/connect-contimer.svg?style=flat
[npm-link]: https://npmjs.org/package/connect-contimer
[deps-image]: https://img.shields.io/david/nodules/connect-contimer.svg?style=flat
[deps-link]: https://david-dm.org/nodules/connect-contimer
