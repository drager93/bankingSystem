var gulp = require("gulp");
var scss = require("gulp-sass");

gulp.task("scss", function() {
  return new Promise((resolve) => {
    gulp
      .src("./assets/styles/index.scss")
      .pipe(scss({ outputStyle: "compressed" }).on("error", scss.logError))
      .pipe(gulp.dest("./assets/styles"));
    resolve();
  });
});

gulp.task("watch", function() {
  gulp.watch("./assets/styles/*.scss", gulp.series("scss"));
  gulp.watch("./assets/styles/module/*.scss", gulp.series("scss"));
  gulp.watch("./assets/styles/shared/*.scss", gulp.series("scss"));
});
