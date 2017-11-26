	
const 	gulp = require('gulp'),
		watch = require('gulp-watch'),
    	prefixer = require('gulp-autoprefixer'), 
    	rigger = require('gulp-rigger'),
        sass = require('gulp-sass'),
        browserSync = require('browser-sync')
        babel = require('gulp-babel');

var reload = browserSync.reload;
var path = {
    build: {
        html: 'build/',
        css: 'build/css/',
        js:'build/js/'
    },
    src: {
        html: 'src/*.html',
        style: 'src/style/main.scss',
        js:'src/js/*.js'
    },
    watch: {
        html: 'src/**/*.html',
        style: 'src/style/**',
        js:'src/js/**/*.js'
    },
    clean: './build'
};

gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream:true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) 
        .pipe(sass({
            includePaths: ['src/style/'],
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream:true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) 
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream:true}));
});

gulp.task('browserSync', function() {
    browserSync({
      server: {
        baseDir: "build/",
        directory: true
      },
      port: 8080,
      open: true,
      notify: true
    });
  });


gulp.task('build', [
    'html:build',
    'style:build',
    'js:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
});

gulp.task('default', ['build', 'watch', 'browserSync']);