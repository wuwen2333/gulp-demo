const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify'); // 压缩js
const clean = require('gulp-clean'); // 清空文件夹
const browserSync = require('browser-sync'); // web服务器

const imagemin = require('gulp-imagemin'); // 图片压缩
const pngquant = require('imagemin-pngquant'); // 深度压缩png

const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps'); //sass调试map图
const autoprefixer = require('gulp-autoprefixer'); //css加浏览器版本前缀
const rename = require('gulp-rename'); // 重命名
const replace = require('gulp-replace');

const minimist = require('minimist');

const distDir = './dist';
const devDir = './src';

gulp.task('default', ['convertJS', 'restore', 'sass', 'picmin', 'lib'], function() {
  const argv = require('minimist')(process.argv.slice(2));
  browserSync.init({
    server: './dist',
    port: argv.port || 3000,
    directory: true
  });
  gulp.watch(`${devDir}/**/*.scss`, ['sass']);
  // gulp.watch(`${devDir}/**/*.js`, ['convertJS', 'browserify']);
  gulp.watch(`${devDir}/**/*.js`, ['convertJS']);
  gulp.watch(`${devDir}/**/*.{html,css}`, ['restore']);
  gulp.watch(`${devDir}/**/images/*`, ['picmin']);
  gulp.watch(`./lib/*`, ['lib']);

  gulp.watch(`${distDir}/**/*.html`).on('change', browserSync.reload);
  gulp.watch(`${distDir}/**/*.css`).on('change', browserSync.reload);
  gulp.watch(`${distDir}/**/*.js`).on('change', browserSync.reload);
});

// 说明
gulp.task('help', function() {
  console.dir('启动项目: gulp --port (default:3000)');
  console.dir('新建页面: gulp page --module moduleName --name pageName --js');
  console.dir('清空dist目录: gulp clean');
})
// 生成一个新页面
gulp.task('page', function() {
  const argv = require('minimist')(process.argv.slice(2));
  if (argv.module && argv.name) {
    return gulp.src(`./template/**/*.{${argv.js ? 'js' : ''},html,scss}`)
      .pipe(rename(function (path) {
        path.dirname = path.dirname.replace('template', argv.module);
        path.basename = argv.name;
      }))
      .pipe(replace('/template.', `/${argv.name}.`))
      .pipe(gulp.dest(`${devDir}/${argv.module}`));
  } else {
    console.dir('新建页面:gulp page --module moduleName --name pageName --js')
    return;
  }
})

// 编译并压缩js
gulp.task('convertJS', function(){
  return gulp.src(`${devDir}/**/*.js`)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(distDir));
})

//另存html页面
gulp.task('restore', function () {
  return gulp.src(`${devDir}/**/*.{html,css}`)
    .pipe(gulp.dest(distDir));
});

//另存lib第三方库
gulp.task('lib', function () {
  return gulp.src(`./lib/**/*.{js,css}`)
    .pipe(gulp.dest(`${distDir}/lib`));
});

// 编译sass
gulp.task('sass', function () {
  return gulp.src(`${devDir}/**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(rename(function (path) {
      path.dirname = path.dirname.replace('/scss', '/css');
    }))
    .pipe(gulp.dest(distDir));
});

//图标压缩
gulp.task('picmin', function(){
  return gulp.src(`${devDir}/**/*.{png,jpg,gif,ico}`)
    .pipe(imagemin({
        progressive: true, // 类型：Boolean 默认：false 无损压缩jpg图片
        svgoPlugins: [{removeViewBox: false}], // 不要移除svg的viewbox属性
        use: [pngquant()] // 使用pngquant深度压缩png图片的imagemin插件
    }))
    .pipe(gulp.dest(distDir));
});

//清空文件夹
gulp.task('clean', function(){
  return gulp.src([
      distDir,
    ], {
      read: false
    }).pipe(clean());
});