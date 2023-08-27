const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

function compileSCSS() {
	return gulp.src('./scss/**/*.scss')				
		.pipe(sass().on('error', sass.logError))		
		.pipe(gulp.dest('./assets/css/'))
		.pipe(minify())				
		.pipe(rename({ extname: '.min.css' }))
		.pipe(gulp.dest('./assets/css/'));		
}

function generateSourceMapCSS() {
	return gulp.src(['./assets/css/styles.css','./assets/css/styles.min.css'])				
    .pipe(sourcemaps.init())    
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('assets/css/'));
}

function copyJSFiles() {
	const jsFiles = [		
		'./node_modules/bootstrap/dist/js/bootstrap.min.js'
		, './node_modules/bootstrap/dist/js/bootstrap.min.js.map'		
	]
	return gulp.src(jsFiles)
	.pipe(rename(function (path) {		
		path.basename = "theme";		
	}))
    .pipe(gulp.dest('./assets/js/'));
}  

function importFontAwesomeFiles() {	
	return gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/**/*.*')						
		.pipe(gulp.dest('./assets/fonts/'));		
}

function copyFontFiles() {
	return gulp.src('./fonts/**/*.*')						
		.pipe(gulp.dest('./assets/fonts/'));		
}

exports.buildCSS = gulp.series(compileSCSS,generateSourceMapCSS)
exports.buildJS = gulp.series(copyJSFiles)
exports.buildFont = gulp.series(importFontAwesomeFiles,copyFontFiles) 
exports.copyFont = gulp.series(copyFontFiles) 

exports.default = gulp.parallel(exports.buildCSS,exports.buildJS,exports.buildFont);
exports.build = exports.default;

exports.watch = function () {
	gulp.watch('./scss/**/*.scss', exports.buildCSS);	
	gulp.watch('./js/**/*.js', exports.buildJS);	
	gulp.watch('./fonts/**/*.*', exports.copyFont);	
};