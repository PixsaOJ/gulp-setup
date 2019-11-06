const { src, dest, parallel } = require('gulp');
const cssMin = require('gulp-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();


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
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify({ mangle: { toplevel: true } }))
        .pipe(dest('build/js', { sourcemaps: false }))
}

function watchSync() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });

    watch("src/css/*.css", css);
    watch("src/js/*.js").on("change", () => {
        js()
        browserSync.reload()
    });
    watch("src/*.html").on("change", () => {
        html()
        browserSync.reload()
    });
}

exports.js = js;
exports.css = css;
exports.html = html;
exports.watch = watchSync;
exports.default = parallel(html, css, js);