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
var origin = "./src/ts/ModalBoxInput.ts";
var destHTMLDoc = './doc/HTML_doc';
var destAPIDoc = './doc/MD_API_doc';
var Server = require('karma').Server;
var jasmine = require("jasmine");
var tsProject = ts.createProject('tsconfig.json', { noImplicitAny: true });

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
    return gulp.src("./src/ts/**/*.ts")
                .pipe(ts())
                .pipe(gulp.dest("./temp/"));
});
gulp.task("2ts:Qtest", function () {
    return gulp.src("./temp/indexfortest.js") 
                .pipe(browserify())               
                .pipe(gulp.dest("./quickVisualTest/"))
});
gulp.task("ts:dist", function(){
        return gulp.src("./src/ts/**/*.ts")
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
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function(){
      done();
  }).start();
});

gulp.task('test:prepare_module',function(){
    return gulp.src("./src/ts/**/*.ts")
                .pipe(ts())
                .pipe(gulp.dest("./test/"));
        
});

gulp.task("jasmine", function(){
        var Jasmine = require('jasmine');
        var jasmine = new Jasmine();
        jasmine.loadConfigFile('jasmine.json');
        var CustomReporter = require('jasmine-spec-reporter').SpecReporter;
        var customReporter = new CustomReporter();
        jasmine.addReporter(customReporter);
        jasmine.configureDefaultReporter({
            showColors: true
        });
        jasmine.execute();
});
gulp.task("test:jasmine", function(){
    return runsequence(
        "test:prepare_module",
        "jasmine"
    );
});






