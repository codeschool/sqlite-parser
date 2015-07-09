module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        require: ['lib/parser-util.js', 'lib/parser.js'],
        src: ['index.js'],
        dest: 'dist/sqlite-parser.js'
      },
      interactive: {
        options: {
          alias: {
            'sqlite-parser': './index',
            'sqlite-parser-util': './lib/parser-util',
            'codemirror': './node_modules/codemirror/lib/codemirror',
            'foldcode': './node_modules/codemirror/addon/fold/foldcode',
            'foldgutter': './node_modules/codemirror/addon/fold/foldgutter',
            'brace-fold': './node_modules/codemirror/addon/fold/brace-fold',
            'panel': './node_modules/codemirror/addon/display/panel',
            'mode-javascript': './node_modules/codemirror/mode/javascript/javascript',
            'mode-sql': './node_modules/codemirror/mode/sql/sql'
          },
        },
        require: [
          'lib/parser-util.js', 'lib/parser.js', './index.js',
          'node_modules/codemirror/lib/codemirror',
          'node_modules/codemirror/addon/fold/foldcode',
          'node_modules/codemirror/addon/fold/foldgutter',
          'node_modules/codemirror/addon/fold/brace-fold',
          'node_modules/codemirror/addon/display/panel',
          'node_modules/codemirror/mode/javascript/javascript',
          'node_modules/codemirror/mode/sql/sql'
        ],
        src: ['src/demo/demo.js'],
        dest: '.tmp/js/sqlite-parser-demo.js'
      }
    },
    copy: {
      build: {
        files: [{
          filter: 'isFile',
          expand: true,
          cwd: 'src/',
          src: ['*.js'],
          dest: 'lib/'
        }]
      },
      interactive: {
        files: [{
          src: ['src/demo/index.html'],
          flatten: true,
          expand: true,
          dest: '.tmp/'
        }],
      },
      demo: {
        src: ['**/*.{html,css}'],
        expand: true,
        cwd: '.tmp/',
        dest: 'demo/'
      }
    },
    clean: {
      build: ['lib/*.js'],
      dist: ['dist/*.js'],
      interactive: ['.tmp/**/*'],
      demo: ['demo/**/*']
    },
    shell: {
      build: {
        options: {
          failOnError: true
        },
        command: './node_modules/.bin/pegjs --optimize "speed" src/grammar.pegjs lib/parser.js'
      },
      test: {
        options: {
          failOnError: true
        },
        command: './node_modules/.bin/mocha test/index-spec.js --reporter="nyan" --colors'
      },
      debug: {
        options: {
          failOnError: false,
          debounceDelay: 500,
          forever: true
        },
        command: 'DEBUG=true ./node_modules/.bin/mocha test/index-spec.js --reporter="list" --colors'
      },
      json: {
        options: {
          failOnError: false
        },
        command: 'UGLY=true DEBUG=true ./node_modules/.bin/mocha test/index-spec.js --colors --reporter="list"'
      }
    },
    connect: {
      server: {
        options: {
          port: 8080,
          base: '.tmp',
          livereload: true
        }
      }
    },
    watch: {
      debug: {
        options: {
          debounceDelay: 250,
          livereload: false
        },
        files: [
          'index.js', 'test/*.js', 'src/*.js', 'src/*.pegjs',
          'test/sql/*.sql', 'Gruntfile.js'
        ],
        tasks: ['build', 'shell:debug']
      },
      live: {
        options: {
          debounceDelay: 1000,
          livereload: {
            directory: '.tmp/',
            port: 35729
          },
        },
        files: [
          'index.js', 'src/**/*.{js,pegjs,css,html}', 'Gruntfile.js'
        ],
        tasks: ['interactive']
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/sqlite-parser-min.js': ['dist/sqlite-parser.js']
        }
      },
      demo: {
        files: {
          'demo/js/sqlite-parser-demo.js': ['.tmp/js/sqlite-parser-demo.js']
        }
      }
    },
    cssmin: {
      interactive: {
        options: {
          processImport: true
        },
        files: {
          '.tmp/css/sqlite-parser-demo.css': [
            'node_modules/codemirror/lib/codemirror.css',
            'node_modules/codemirror/addon/fold/foldgutter.css',
            'node_modules/codemirror/theme/monokai.css',
            'src/demo/demo.css'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', [
    'build'
  ]);
  grunt.registerTask('build', [
    'clean:build', 'shell:build', 'copy:build'
  ]);
  grunt.registerTask('test', [
    'build', 'shell:test'
  ]);
  grunt.registerTask('debug', [
    'build', 'shell:debug', 'watch:debug'
  ]);
  grunt.registerTask('json', [
    'build', 'shell:json'
  ]);
  grunt.registerTask('interactive', [
    'clean:interactive', 'default', 'copy:interactive', 'cssmin:interactive',
    'browserify:interactive'
  ]);
  grunt.registerTask('live', [
    'interactive', 'connect:server', 'watch:live'
  ]);
  grunt.registerTask('demo', [
    'interactive', 'clean:demo', 'copy:demo', 'uglify:demo'
  ]);
  grunt.registerTask('dist', [
    'default', 'clean:dist', 'browserify:dist', 'uglify:dist'
  ]);
  grunt.registerTask('release', [
    'test', 'dist', 'demo', 'clean:interactive'
  ]);
};
