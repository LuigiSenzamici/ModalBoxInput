/// <binding />
var gulp = require('gulp');
var ts = require('gulp-typescript');
var stylus = require('gulp-stylus');
var browserify = require('gulp-browserify');
var transform = require('vinyl-transform');
var uglify = require("gulp-uglify");
var sourcemap = require("gulp-sourcemaps");
var runsequence = require("run-sequence");
var rename = require("gulp-rename");
var doc = require('gulp-documentation');
var origin = "./src/ts/ModalBoxInput.ts";
var destHTMLDoc = './doc/HTML_doc';
var destAPIDoc = './doc/MD_API_doc';


gulp.task("stylus:Qtest", function () {
    return gulp.src("./src/index.styl")
                .pipe(stylus())
                .pipe(rename("ModalBoxInput.css"))
                .pipe(gulp.dest("./quickVisualTest/"));
});
gulp.task("stylus:dist", function(){
    return gulp.src("./src/index.styl")
                .pipe(stylus())
                .pipe(rename("ModalBoxInput.css"))
                .pipe(gulp.dest("./dist/"));
});
gulp.task("1ts:temp", function () {
    return gulp.src("./src/ts/ModalBoxInput.ts")
                .pipe(ts())
                .pipe(gulp.dest("./temp/"));
});
gulp.task("2ts:Qtest", function () {
    return gulp.src("./temp/indexfortest.js")
                .pipe(browserify())
                .pipe(gulp.dest("./quickVisualTest/"))
});
gulp.task("ts:dist", function(){
        return gulp.src("./src/ts/ModalBoxInput.ts")
                .pipe(ts())
                .pipe(uglify())
                .pipe(gulp.dest("./dist/"));
});
gulp.task("ts:quickTest",function(){
    return runsequence(
        ["1ts:temp", "stylus:Qtest"],
        "2ts:Qtest"
    );
});
gulp.task("dist",function(){
    return runsequence(
        ["ts:dist", "stylus:dist"]
    );
});

gulp.task('doc:html', function () {
    return gulp.src(origin)
      .pipe(doc('html'))
      .pipe(gulp.dest(destHTMLDoc));
});
gulp.task('doc:readme', function () {
    return gulp.src(origin)
      .pipe(doc('md'))
      .pipe(gulp.dest(destAPIDoc));
});
gulp.task('doc', ['doc:html', 'doc:readme']);



