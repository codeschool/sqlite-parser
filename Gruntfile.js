module.exports = function(grunt) {
  function getBanner(isDemo) {
    return '/*!' +
     ' * sqlite-parser' + (isDemo ? ' demo' : '') +
     ' * @copyright Code School 2015 {@link http://codeschool.com}' +
     ' * @author Nick Wronski <nick@javascript.com>' +
     ' */';
  }
  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          browserifyOptions: {
            debug: false,
            standalone: 'sqliteParser'
          }
        },
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
        command: './node_modules/.bin/pegjs --optimize speed src/grammar.pegjs lib/parser.js'
      },
      test: {
        options: {
          failOnError: true
        },
        command: './node_modules/.bin/mocha --reporter=nyan'
      },
      debug: {
        options: {
          failOnError: false,
          debounceDelay: 500,
          forever: true
        },
        command: 'DEBUG=true ./node_modules/.bin/mocha'
      },
      json: {
        options: {
          failOnError: false
        },
        command: 'UGLY=true DEBUG=true ./node_modules/.bin/mocha'
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
      options: {
        screwIE8: true,
        mangle: {
          except: ['sqliteParser']
        },
      },
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
    },
    usebanner: {
      options: {
        position: 'top',
        linebreak: true
      },
      dist: {
        options: {
          banner: getBanner(false)
        },
        files: {
          src: [
            'dist/sqlite-parser-min.js',
            'dist/sqlite-parser.js',
          ]
        }
      },
      demo: {
        options: {
          banner: getBanner(true)
        },
        files: {
          src: [
            'demo/js/sqlite-parser-demo.js',
          ]
        }
      }
    },
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
    'interactive', 'clean:demo', 'copy:demo', 'uglify:demo', 'usebanner:demo'
  ]);
  grunt.registerTask('dist', [
    'default', 'clean:dist', 'browserify:dist', 'uglify:dist', 'usebanner:dist'
  ]);
  grunt.registerTask('release', [
    'test', 'dist', 'demo', 'clean:interactive'
  ]);
};
