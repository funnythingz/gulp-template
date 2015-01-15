var gulp = require('gulp');
var react = require('gulp-react');

gulp.task('jsx', function() {
  return gulp.src('src/jsx/**/*.jsx')
                               .pipe(react())
                               .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  return gulp.watch('src/jsx/**/*.jsx', function(event) {
                                  gulp.run('jsx');
                                 });
});

gulp.task('default', function() {
  gulp.run('watch');
});
