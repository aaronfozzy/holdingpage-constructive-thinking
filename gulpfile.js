const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

// Compile scss into css
function style(){
    return gulp.src('scss/*.scss')
    .pipe(sass({
        outputStyle: 'compressed',
        includePaths: ['node_modules/susy/sass']
    }).on('error', sass.logError))
    .pipe(gulp.dest('www/css'))
    .pipe(browserSync.stream());
}
// Compile js
function scripts(){
    return gulp.src('js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('www'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('www/js'));
}

function watch(){
    browserSync.init({
        server: {
            baseDir: ''
        }
    });
    gulp.watch('scss/*.scss', style);
    gulp.watch('js/*.js', scripts);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('*.php').on('change', browserSync.reload);
    gulp.watch('js/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.scripts = scripts;
exports.watch = watch;