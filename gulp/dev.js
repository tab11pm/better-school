// dev for developer
const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const changed = require('gulp-changed');

gulp.task('clean:dev', function (done) {
	if (fs.existsSync('./build/')) {
		return (
			gulp
				// if read false task clean file without wathch
				.src('./build/', { read: false })
				.pipe(clean({ force: true }))
		);
	}
	done();
});

const fileIncludeSetting = {
	prefix: '@@',
	basepath: '@file',
};

const plumberNotify = (title) => {
	return {
		errorHandler: notify.onError({
			title: title,
			message: 'Error <%= error.message %>',
			sound: false,
		}),
	};
};

gulp.task('html:dev', function () {
	return (
		gulp
			//* we can get many way with array
			//! but in this script we use for don't get way when we use "!"
			.src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
			.pipe(changed('./build/', { hasChanged: changed.compareContents }))
			.pipe(plumber(plumberNotify('HTML')))
			.pipe(fileInclude(fileIncludeSetting))
			.pipe(gulp.dest('./build/'))
	);
});

gulp.task('sass:dev', function () {
	return (
		gulp
			.src('./src/scss/*.scss')
			.pipe(changed('./build/css/'))
			.pipe(plumber(plumberNotify('SCSS')))
			.pipe(sourceMaps.init())
			// sass glob need for
			.pipe(sassGlob())
			.pipe(sass())
			.pipe(sourceMaps.write())
			.pipe(gulp.dest('./build/css/'))
	);
});

gulp.task('images:dev', function () {
	return (
		gulp
			.src('./src/img/**/*')
			.pipe(changed('./build/img/'))
			// .pipe(imagemin({ verbose: true }))
			.pipe(gulp.dest('./build/img/'))
	);
});

gulp.task('fonts:dev', function () {
	return gulp
		.src('./src/fonts/**/*')
		.pipe(changed('./build/fonts/'))
		.pipe(gulp.dest('./build/fonts/'));
});

gulp.task('libs:dev', function () {
	return gulp
		.src('./src/libs/**/*')
		.pipe(changed('./build/libs/'))
		.pipe(gulp.dest('./build/libs/'));
});

gulp.task('js:dev', function () {
	return (
		gulp
			.src('./src/js/*.js')
			.pipe(changed('./build/js/'))
			.pipe(plumber(plumberNotify('JS')))
			// .pipe(babel())
			.pipe(webpack(require('./../webpack.config.js')))
			.pipe(gulp.dest('./build/js/'))
	);
});

const serverOptions = {
	livereload: true,
	open: true,
};

gulp.task('server:dev', function () {
	return gulp.src('./build/').pipe(server(serverOptions));
});

gulp.task('watch:dev', function () {
	gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass:dev'));
	gulp.watch('./src/html/**/*.html', gulp.parallel('html:dev'));
	gulp.watch('./src/img/**/*', gulp.parallel('images:dev'));
	gulp.watch('./src/fonts/**/*', gulp.parallel('fonts:dev'));
	gulp.watch('./src/files/**/*', gulp.parallel('libs:dev'));
	gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev'));
});
