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

const distDir = './dist';
const devDir = './src';

gulp.task('default', ['convertJS', 'restore', 'sass', 'picmin', 'lib'], function() {
  browserSync.init({
    server: './dist',
    directory: true
  });
  gulp.watch(`${devDir}/**/*.scss`, ['sass']);
  gulp.watch(`${devDir}/**/*.js`, ['convertJS']);
  gulp.watch(`${devDir}/**/*.{html,css}`, ['restore']);
  gulp.watch(`${devDir}/**/images/*`, ['picmin']);
  gulp.watch(`./lib/*`, ['lib']);

  gulp.watch(`${distDir}/**/*.html`).on('change', browserSync.reload);
  gulp.watch(`${distDir}/**/*.css`).on('change', browserSync.reload);
  gulp.watch(`${distDir}/**/*.js`).on('change', browserSync.reload);
});

// 生成一个新项目
// gulp.task('project', function() {
//   if (gulp.env.name) {
//     return gulp.src('./template/**/*')
//       .pipe(rename(function (path) {
//         path.dirname = path.dirname.replace('template', gulp.env.name);
//       }))
//       .pipe(gulp.dest(`${devDir}/${gulp.env.name}`));
//   } else {
//     return ;
//   }
// })

// 生成一个新页面
gulp.task('page', function() {
  if (gulp.env.module && gulp.env.name) {
    return gulp.src(`./template/**/*.{${gulp.env.js ? 'js' : ''},html,scss}`)
      .pipe(rename(function (path) {
        path.dirname = path.dirname.replace('template', gulp.env.module);
        path.basename = gulp.env.name;
      }))
      .pipe(gulp.dest(`${devDir}/${gulp.env.module}`));
  } else {
    return;
  }
})

// 编译并压缩js
gulp.task('convertJS', function(){
  return gulp.src(`${devDir}/**/*.js`)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(distDir));
})

//另存html页面
gulp.task('restore', function () {
  return gulp.src(`${devDir}/**/*.{html,css}`)
    .pipe(gulp.dest(distDir));
});

// //另存css
// gulp.task('css', function () {
//   return gulp.src(`${devDir}/**/*.css`)
//     .pipe(gulp.dest(distDir));
// });

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