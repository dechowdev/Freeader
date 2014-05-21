//GRUNT TEST

module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // concat: {
        //     // 2. Configuration for concatinating files goes here.
        // }
        // 
        compass: {                  // Task
            dist: {                   // Target
              options: {              // Target options
                config: 'config.rb'
              }
            }
        },

        csscomb: {
            dist: {
                files: {
                    'dist/css/app.css': ['assets/css/app.css'],
                },

                // When we start to have ALOT of differet css files, 
                // this might come in handy...
                // - - *** - -
                // dynamic_mappings: {
                //     expand: true,
                //     cwd: '/assets/css/',
                //     src: ['*.css', '!*.resorted.css'],
                //     dest: '/assets/dest/css/',
                //     ext: '.resorted.css'
                // }
            }
        },

        csslint: {
          strict: {
            options: {
              import: 2
            },
            src: ['dist/css/**/*.css']
            }
        },

        recess: {
            options: {
                noUnderscores: false
            },
            dist: {
                src: ['dist/css/**/*.css']
            }
        },

        csso: {
            dist: {
                expand: true,
                cwd: 'dist/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/css/',
                ext: '.min.css'
            }
        },

        concat: {   
            dist: {
                src: [
                    'assets/js/libs/*.js' // All JS in the libs folder
                ],
                dest: 'dist/js/libs.js',
            }
        },

        uglify: {
            dist: {
              files: {
                'dist/js/app.min.js': ['assets/js/**/*.js', '!assets/js/libs/*.js'],
                'dist/js/libs.min.js': ['dist/js/libs.js']
              },
            },
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/img/'
                }]
            }
        },

        clean: {
            js: ["dist/js/*.js", "!dist/js/*.min.js"],
            css: ['dist/css/*.css'],
            compass: ['assets/css/*.css', '!assets/css/libs/*.css']
        },

        watch: {
          styles: {
            files: ['assets/scss/**/*.scss', '!assets/scss/libs/**/*.scss'],
            tasks: ['styles'],
            options: {
              spawn: false,
            },
          },
          scripts: {
            files: ['assets/js/**/*.js'],
            tasks: ['scripts'],
            options: {
              spawn: false,
            },
          },
          images: {
            files: [
                'assets/img/**/*.png',
                'assets/img/**/*.svg',
                'assets/img/**/*.jpg'
            ],
            tasks: ['imagemin'],
            options: {
              spawn: false,
            },
          },
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-csscomb');
    grunt.loadNpmTasks('grunt-recess');
    //grunt.loadNpmTasks('grunt-contrib-uglify')
    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['styles', 'scripts', 'imagemin']);
    // 5. Registering different tasks for ease and use, just to compile scripts/styles or a meager build
    grunt.registerTask('build', ['compass', 'csscomb', 'concat', 'recess']);
    grunt.registerTask('styles', ['clean:compass','clean:css','compass', 'csscomb', 'csso', 'csslint', 'recess']);
    grunt.registerTask('scripts', ['clean:js','concat', 'uglify']);
};