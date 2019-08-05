var gulp = require('gulp');
var $ = require('gulp-load-plugins')();  //gulp-load-plugins是一个函数，需要()让它执行，从而接受它的返回值，此时$是一个对象
var open = require('open');  //独立于gulp，不是gulp插件


gulp.task('less',function () {
    return gulp.src('src/less/**/*.less')
        .pipe($.less())
        .pipe(gulp.dest('src/css'))
       // .pipe($.livereload()) //表示实时刷新
})

gulp.task('css',['less'],function () {
    return gulp.src('src/css/**/*.css')
        .pipe($.concat('test.css'))
        .pipe($.cssmin())
        .pipe($.rename({suffix:'.min'}))
        .pipe(gulp.dest('dist/css'))
        .pipe($.livereload()) //表示实时刷新
        .pipe($.connect.reload())
})

gulp.task('js',function () {
    return gulp.src('src/js/**/*.js')
        .pipe($.babel())
        .pipe($.concat('test.js'))
        .pipe($.uglify())
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js/'))
        .pipe($.livereload()) //表示实时刷新
        .pipe($.connect.reload())
})

gulp.task('html',function () {
    return gulp.src('src/**/*.html')
        .pipe($.htmlmin({collapseWhitespace:true}))
        .pipe(gulp.dest('dist/'))
        .pipe($.livereload()) //表示实时刷新
        .pipe($.connect.reload())
})

//半自动，需要手动刷新页面
gulp.task('watch',['default'],function () {
    //开启监听
    //$.livereload.listen();
    //保证监听目标已经绑定相应的任务
    gulp.watch(['src/less/**/*.less','src/css/**/*.css'],['css']);
    gulp.watch('src/js/**/*.js',['js']);
    gulp.watch('src/**/*.html',['html']);
})

//全自动，无需手动刷新页面
gulp.task('server',['default'],function () {
    //配置服务器的选项
    $.connect.server({
        root:'dist/',
        livereload:true,
        port:5000
    })

    open('http://localhost:5000/');

    //保证监听目标已经绑定相应的任务
    gulp.watch(['src/less/**/*.less','src/css/**/*.css'],['css']);
    gulp.watch('src/js/**/*.js',['js']);
    gulp.watch('src/**/*.html',['html']);

})

gulp.task('default',['css','less','js','html'])

