var gulp = require('gulp')
var cached = require('gulp-cached')
var remember = require('gulp-remember')
var fs = require('fs')
var babel = require('gulp-babel')
var del = require('del')
var gulpSequence = require('gulp-sequence')
var minimist = require('minimist')
var browserSync = require('browser-sync')
var reload = browserSync.reload
var weappCompiler = require('weichen-weapp-compiler')
var scriptHandler = weappCompiler.scriptHandler
var vueHandler = weappCompiler.vueHandler
var wxmlHandler = weappCompiler.wxmlHandler
var wxssHandler = weappCompiler.wxssHandler
var toVueHandler = weappCompiler.toVueHandler
var toAliHandler = weappCompiler.toAliHandler

var webpackStream = require('webpack-stream')
var webpack2 = require('webpack')
var webpackConfig = require('./webpack.config')

var argv = minimist(process.argv.slice(2))
var h5BuildFilePath = argv.page && String(argv.page) != 'true' ? argv.page.split(',') : './src/**/*.vue'

// weapp start
var vuePath = ['./src/app.vue', './src/**/index.vue', './src/components/**/*.vue']
gulp.task('vue', function () {
	return gulp.src(vuePath)
        .pipe(remember('weapp'))
		.pipe(vueHandler())
})

gulp.task('wxss', function () {
	return gulp.src(['./temp/**/*.wxss'])
		.pipe(wxssHandler())
		.pipe(gulp.dest(function (data) {
			return data.base.replace('temp', 'dist')
		}))
})

gulp.task('wxml', function () {
	return gulp.src(['./temp/pages/**/*.wxml'])
		.pipe(wxmlHandler())
		.pipe(gulp.dest(function (data) {
			return data.base.replace('temp', 'dist')
		}))
})

gulp.task('script', function () {
	return gulp.src(['./src/**/*.js', './temp/**/*.js'])
	    .pipe(babel({
	        presets: ['es2015', 'stage-3'],
	        plugins: ['transform-runtime']
	    }))
	    .pipe(scriptHandler())
	    .pipe(gulp.dest('dist'))
})

gulp.task('clean:temp', function () {
	return del('./temp/**', {force:true})
})

gulp.task('copy', function () {
	return gulp.src(['./src/**/*', '!./src/**/*.js', '!./src/**/*.vue'])
	    .pipe(gulp.dest('dist'))
})

gulp.task('weapp', function (cb) {
	gulpSequence(
        'clean:temp',
		'vue',
		'wxss',
		'wxml',
		'script',
		'copy',
		'clean:temp',
        cb
	)
})
// weapp end

// h5 begin
gulp.task('toVue', function () {
	return gulp.src(h5BuildFilePath)
        .pipe(cached('h5'))
		.pipe(toVueHandler())
})

gulp.task('copyToH5', function () {
	return gulp.src(['./src/**/*', '!./src/**/*.vue'])
	    .pipe(gulp.dest('dist_h5'))
})

gulp.task('compileH5', function () {
    return gulp.src('./dist_h5/main.js')
        .pipe(webpackStream(webpackConfig, webpack2))
        .pipe(gulp.dest('./dist_h5'))
})

gulp.task('h5', function (cb) {
	gulpSequence(
		'toVue',
		'copyToH5',
        'compileH5',
        cb
	)
})
// h5 end

// ali begin
gulp.task('copy:ali', function () {
	return gulp.src('./dist/**')
	    .pipe(gulp.dest('dist_ali'))
})

gulp.task('clean:weapp', function () {
	return del(['./dist_ali/**/*.wxml', './dist_ali/**/*.wxss'], {force:true})
})

gulp.task('toAli', function () {
	return gulp.src([
		'./dist_ali/**/*.js',
		'./dist_ali/**/*.wxml',
		'./dist_ali/**/*.wxss',
		'./dist_ali/**/*.json',
		'!./dist_ali/vendor/**'
		])
		.pipe(toAliHandler())
		.pipe(gulp.dest(function (data) {
			return data.base
		}))
})

gulp.task('aliapp', function (cb) {
	gulpSequence(
		'weapp',
		'copy:ali',
		'toAli',
		'clean:weapp',
        cb
	)
})
// ali end

// watch begin
gulp.task('watch:h5', ['h5'], function () {
    var watcher = gulp.watch(vuePath, ['h5'])
    watcher.on('change', (event) => {
        if (event.type === 'deleted') {
            delete cached.caches.h5[event.path]
        }
    })

	browserSync.init({
		server: {
			baseDir: 'dist_h5'
		},
        notify: false,
		ui: false
	})
	gulp.watch(['main.build.js'], {cwd: 'dist_h5'}, reload)
})

gulp.task('watch:weapp', ['weapp'], function () {
    var watcher = gulp.watch(vuePath, ['weapp'])
    watcher.on('change', (event) => {
        if (event.type === 'deleted') {
            remember.forget('weapp', event.path)
        }
    })
})

gulp.task('watch:aliapp', ['aliapp'], function () {
    var watcher = gulp.watch(vuePath, ['aliapp'])
    watcher.on('change', (event) => {
        if (event.type === 'deleted') {
            remember.forget('weapp', event.path)
        }
    })
})
// watch end
