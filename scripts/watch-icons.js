var fs = require('fs');
var path = require('path');
var watch = require('watch');
var convertSvgToJs = require('./svg-to-js');

var watchRoot = path.join(process.cwd(), "src/components/common/Icon/assets");
var watchOptions = {
    interval: 0.2,
    filter: (f) => {
        return fs.lstatSync(f).isDirectory() || f.substr(f.length - 4) === '.svg';
    }
}

watch.watchTree(watchRoot, watchOptions, (f, curr, prev) => {
    if (typeof f == "object" && prev === null && curr === null) {
        // Finished walking the tree
    } else if (prev === null) {
        // f is a new file
        convertSvgToJs(f, f + '.js');
    } else if (curr.nlink === 0) {
        // f was removed
    } else {
        // f is modified
        convertSvgToJs(f, f + '.js');
    }
});
