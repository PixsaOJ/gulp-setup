const { src, dest, parallel } = require('gulp');
const cssMin = require('gulp-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

function html() {
    return src('src/index.html')
        .pipe(dest('build/'))
}

function css() {
    return src('src/css/*.css')
        .pipe(concat('main.min.css'))
        .pipe(cssMin())
        .pipe(dest('build/css'))
}

function js() {
    return src('src/js/*.js', { sourcemaps: false })
        .pipe(concat('app.min.js'))
        .pipe(uglify({ mangle: { toplevel: true } }))
        .pipe(dest('build/js', { sourcemaps: false }))
}

exports.js = js;
exports.css = css;
exports.html = html;
exports.default = parallel(html, css, js);