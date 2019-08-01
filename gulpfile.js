const gulp = require('gulp');
const tslint = require('gulp-tslint');

exports.watch = () => {
  const tslintSrc = 'src/**/*.ts';
  gulp.watch(tslintSrc, () => {
    return gulp.src(tslintSrc)
      .pipe(tslint())
      .pipe(tslint.report({ emitError: false }))
  })
};

