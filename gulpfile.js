var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
        ext: "ejs, js, json, css",
        watch: ['*', 'views/', 'public/js/', 'models/', 'middleware/', 'helpers/', 'config/'],
        script: 'app.js',
        ignore: ['gulpfile.js', 'node_modules/']
    })
    .on('start', function () {
        if (!called) {
            called = true;
            cb();
        }
    })
    .on('restart', function () {
        setTimeout(function () {
            reload({ stream: false });
        }, 500);
    });
});

gulp.task('browser-sync', gulp.series("nodemon", function() {
    browserSync.init({
        proxy: "localhost:3000",
        port: 5000,
        notify: true
    });
}));

gulp.task('default', gulp.series('browser-sync', function () {}));
