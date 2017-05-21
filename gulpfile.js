	
const 	gulp = require('gulp'),
		watch = require('gulp-watch'),
    	prefixer = require('gulp-autoprefixer'), 
    	rigger = require('gulp-rigger'),
	  	sass = require('gulp-sass');

var path = {
    build: {
        html: 'build/',
        css: 'build/css/'
    },
    src: {
        html: 'src/*.html',
        style: 'src/style/main.scss'
    },
    watch: {
        html: 'src/**/*.html',
        style: 'src/style/**',
    },
    clean: './build'
};

gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) 
        .pipe(sass({
            includePaths: ['src/style/'],
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(gulp.dest(path.build.css))
});

gulp.task('build', [
    'html:build',
    'style:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
});

gulp.task('default', ['build', 'watch']);