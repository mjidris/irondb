const gulp = require('gulp');
const sass = require('gulp-sass');
const jest = require('gulp-jest').default;


// fetch command line arguments
const arg = ((argList) => {
  const arg = {}; let a; let opt; let thisOpt; let curOpt;
  for (a = 0; a < argList.length; a++) {
    thisOpt = argList[a].trim();
    opt = thisOpt.replace(/^-+/, '');
    if (opt === thisOpt) {
      // argument value
      if (curOpt) arg[curOpt] = opt;
      curOpt = null;
    } else {
      // argument name
      curOpt = opt;
      arg[curOpt] = true;
    }
  }
  return arg;
})(process.argv);

// Task compiles sass to css and moves module files to the public directories.
gulp.task('sass', function() {
  return gulp.src(['bin/scss/custom.scss'])
      .pipe(sass())
      .pipe(gulp.dest('public/stylesheets'));
});

// Move JS files to public javascripts directory.
gulp.task('js', function() {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/tether/dist/js/tether.min.js',
    'node_modules/popper.js/dist/popper.min.js',
    'node_modules/pdfobject/pdfobject.min.js',
    'node_modules/ejs/ejs.min.js'])
      .pipe(gulp.dest('public/javascripts'));
});

// Run test suite
gulp.task('jest', function() {
  // Test ran outside docker, require env to be set to avoid error.
  if (typeof arg=='undefined' || (arg.u) ==null || (arg.p) ==null) {
    console.log('Requires --u and --p flag with postgres'+
     'username and password!');
    process.exit(1);
  }
  process.env.DATABASE_URL = 'postgres://'+ arg.u+':'+ arg.p+'@localhost:5433/postgres';
  console.log(process.env.DATABASE_URL);
  return gulp.src('__tests__').pipe(jest({
    'preprocessorIgnorePatterns': [
      'public/javascripts/bootstrap.bundle.min.js',
      'public/javascripts/jquery.min.js',
      'public/javascripts/tether.min.js',
      'node_modules/',
    ],
    'collectCoverage': true,
    'coveragePathIgnorePatterns': [
      'public/javascripts/bootstrap.bundle.min.js',
      'public/javascripts/jquery.min.js',
      'public/javascripts/tether.min.js',
      'node_modules/',
    ],
    'automock': false,
  }));
});
