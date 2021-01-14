/*===============Vars List===============*/
const project_folder = require('path').basename(__dirname);
const source_folder = "#src";
const { init } = require('browser-sync');
const path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css",
        js: project_folder + "/js",
        fonts: project_folder + "/fonts",
        img: project_folder + "/img"
    },

    src: {
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/main.js",
        fonts: source_folder + "/fonts/*.ttf",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },

    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}"
    },
    clean: "./" + project_folder + "/"
};

const {
    src,
    dest
}
    = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create();
fileinclude = require('gulp-file-include');
del = require('del');
scss = require('gulp-sass');
autoprefixer = require('gulp-autoprefixer');
group_media = require('gulp-group-css-media-queries');
clean_css = require('gulp-clean-css');
rename = require('gulp-rename');
clean_js = require('gulp-uglify-es').default;
imagemin = require("gulp-imagemin");
webp = require('gulp-webp');
webpcss = require('gulp-webp-css');
svgSprite = require('gulp-svg-sprite');
ttf2woff = require('gulp-ttf2woff');
ttf2woff2 = require('gulp-ttf2woff2');
fonter = require('gulp-fonter');
webPack = require('webpack');
webPackStream = require('webpack-stream');
sourcemaps = require('gulp-sourcemaps');
/*=====================================================================*/

/*=======================GULP TASKS===============================*/

function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/"
        },
        port: 3000,
        notify: false
    });
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude({
            prefix: '@'
        }))
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function css() {
    return src(path.src.css)
        .pipe(sourcemaps.init())
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 version"],
                cascade: true
            })
        )
        .pipe(webpcss())
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(sourcemaps.write())
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function js() {
    return src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(webPackStream({
            output: {
                filename: 'script.min.js'
            },
            watch: true,
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ['@babel/preset-env', { targets: "defaults" }]
                                ]
                            }
                        }
                    }
                ]
            },
            mode: 'production',
        }))
        .pipe(sourcemaps.write())
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function images() {
    return src(path.src.img)
        .pipe(
            webp({
                quality: 70
            })
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive: true,
                interlaced: true,
                optimizationLevel: 3,
                svgoPlugins: [{
                    removeViewBox: false
                }]
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream());
}

function fonts() {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));

    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));
}
gulp.task('otf2tt', function () {
    return src([source_folder + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest([source_folder + '/fonts/TTF/']));
})

gulp.task('svgSprites', function () {
    return gulp.src([source_folder + '/sprites/*.svg'])
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../sprites.svg",
                    example: true
                }
            },
        }
        ))
        .pipe(dest([source_folder + '/img/']))
        .pipe(dest(path.build.img))
})

function cb() { }

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

function clean(params) {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);
/*=====================================================================*/

/*=========================Exports==============================*/
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.default = watch;
exports.watch = watch;
/*=====================================================================*/