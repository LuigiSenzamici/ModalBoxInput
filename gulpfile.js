/// <binding />
var gulp = require('gulp');
var ts = require('gulp-typescript');
var stylus = require('gulp-stylus');
var browserify = require('gulp-browserify');
var transform = require('vinyl-transform');
var uglify = require("gulp-uglify");
var sourcemap = require("gulp-sourcemaps");
var runsequence = require("run-sequence");


gulp.task("stylus:Qtest", function () {
    return gulp.src("./src/style/index.styl")
                .pipe(stylus())
                .pipe(gulp.dest("./quickVisualTest/"));
});
gulp.task("1ts:temp", function () {
    return gulp.src("./src/ts/ModalBoxInput.ts")
                .pipe(ts({
                    "compilerOptions": {
                        "moduleResolution":"node",
                        "module": "commonjs",
                        "noImplicitAny": true,
                        "removeComments": true,
                        "preserveConstEnums": true,
                        "sourceMap": true,
                        "target":"es2015"
                    }
                }))
                .pipe(gulp.dest("./temp/"));
});
gulp.task("2ts:Qtest", function () {
    return gulp.src("./temp/indexfortest.js")
                .pipe(browserify())
                .pipe(gulp.dest("./quickVisualTest/"))
});

