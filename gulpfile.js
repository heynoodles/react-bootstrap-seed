var gulp = require('gulp');
var path = require('path');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var open = require('gulp-open');
var localhost = "http://127.0.0.1:";
var devPort = 3005;

gulp.task('open', function () {
    gulp.src(__filename)
        .pipe(open({uri: localhost + devPort + "/index.html"}));
});


gulp.task('build', function (callback) {
    webpack(
        require('./webpack.config.pro'), function (err, stats) {
            if (err) throw new gutil.PluginError("webpack", err);
            gutil.log("[webpack]", stats.toString({
                // output options
            }));
            callback();
        });
});

gulp.task('webpackDevServer', function (callback) {
    var compiler = webpack(require('./webpack.config.dev'));

    new WebpackDevServer(compiler, {
        historyApiFallback: true,
        contentBase: './src/html',
        port: devPort,
        stats: {
            colors: true
        },
        hot: 'true'//enables HMR in webpack-dev-server and in libs running in browser
    }).listen(devPort, "127.0.0.1", function (err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", localhost + devPort + "/webpack-dev-server/index.html");
        gulp.src('mocks/**/*.*').pipe(gulp.dest('dist/mocks'))
        gulp.src('index.html').pipe(gulp.dest('dist'))
    });
});

gulp.task('copy-mock', function () {
    return gulp.src('mocks/**/*.*')
        .pipe(gulp.dest('dist/mocks'))
});

gulp.task('copy-index', function () {
    return gulp.src('index.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('watch', function () {
    gulp.watch('mocks/**/*.*', ['copy-mock']);
    gulp.watch('index.html', ['copy-index']);
});


gulp.task('default', ['build']);
gulp.task('dev', ['webpackDevServer', 'open']);


exports.ignores = ["uglify"];