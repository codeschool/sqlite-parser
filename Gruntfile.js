module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        require: ['lib/parser-util.js', 'lib/parser.js'],
        src: ['index.js'],
        dest: 'dist/sqlite-parser.js'
      },
      demo: {
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
        src: ['demo/js/demo.js'],
        dest: 'demo/sqlite-parser-demo.js'
      }
    },
    copy: {
      main: {
        files: [{
          filter: 'isFile',
          expand: true,
          cwd: 'src/',
          src: ['*.js'],
          dest: 'lib/'
        }]
      },
      demo: {
        src: [
          'node_modules/codemirror/lib/codemirror.css',
          'node_modules/codemirror/addon/fold/foldgutter.css',
          'node_modules/codemirror/theme/monokai.css'
        ],
        flatten: true,
        expand: true,
        dest: 'demo/css/'
      }
    },
    clean: {
      main: ['lib/*.js'],
      dist: ['dist/*.js'],
      demo: ['demo/sqlite-parser-demo.js', 'demo/css/*.css', '!demo/css/demo.css']
    },
    shell: {
      pegjs: {
        options: {
          failOnError: true
        },
        command: './node_modules/.bin/pegjs --trace src/grammar.pegjs lib/parser.js'
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
        command: 'UGLY=true DEBUG=true ./node_modules/.bin/mocha test/index-spec.js --reporter="list"'
      }
    },
    connect: {
      server: {
        options: {
          port: 8080,
          base: 'demo',
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
          'Gruntfile.js', 'index.js', 'test/*.js', 'src/*.js',
          'src/*.pegjs', 'test/sql/*.sql'
        ],
        tasks: ['default', 'shell:debug']
      },
      demo: {
        options: {
          debounceDelay: 1000,
          livereload: {
            directory: 'demo/',
            port: 35729
          },
        },
        files: [
          'index.js', 'src/*.js', 'src/*.pegjs', 'demo/js/*.js',
          'Gruntfile.js', 'demo/css/demo.css', 'demo/index.html'
        ],
        tasks: ['default', 'clean:demo', 'browserify:demo', 'copy:demo']
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
          'demo/sqlite-parser-demo-min.js': ['demo/sqlite-parser-demo.js']
        }
      }
    },
    'string-replace': {
      options: {
        replacements: [{
          pattern: '<script src="sqlite-parser-demo-min.js"></script>',
          replacement: '<script src="sqlite-parser-demo.js"></script>'
        }]
      },
      demo: {
        files: {
          'demo/index.html': 'demo/index.html'
        }
      },
      interactive: {
        files: {
          'demo/index.html': 'demo/index.html'
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
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.registerTask('default', ['clean:main', 'shell:pegjs', 'copy:main']);
  grunt.registerTask('test', ['default', 'shell:test']);
  grunt.registerTask('debug', ['default', 'shell:debug', 'watch:debug']);
  grunt.registerTask('json', ['default', 'shell:json']);
  grunt.registerTask('demo', [
    'default', 'clean:demo', 'browserify:demo', 'copy:demo', 'uglify:demo', 'string-replace:demo'
  ]);
  grunt.registerTask('interactive', [
    'default', 'clean:demo', 'browserify:demo', 'copy:demo', 'string-replace:interactive', 'connect:server', 'watch:demo'
  ]);
  grunt.registerTask('dist', ['default', 'clean:dist', 'browserify:dist', 'uglify:dist']);
  grunt.registerTask('release', ['test', 'dist', 'demo']);
};
