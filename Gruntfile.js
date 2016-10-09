var path = require('path');
var fs = require('fs');

module.exports = function(grunt) {
  function getBanner(isDemo) {
    return '/*!\n' +
     ' * <%= pkg.name %>' + (isDemo ? '-demo' : '') + ' - v<%= pkg.version %>\n' +
     ' * @copyright 2015-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
     ' * @author Nick Wronski <nick@javascript.com>\n' +
     ' */';
  }
  function getCmdString(cmd, args) {
    if (!args) args = '';
    const binPath = path.normalize(`node_modules/.bin/${cmd}`);
    return `${binPath} ${customArgs[cmd]} ${args}`.trim();
  }
  const customArgs = {
    mocha: 'test/**/*-spec.js --colors --bail --compilers=js:babel-core/register',
    pegjs: `--trace --cache --optimize size --output lib/parser.js src/grammar.pegjs`
  };

  const tmpDir = './.tmp/';
  if (!fs.existsSync(tmpDir)){
    fs.mkdirSync(tmpDir);
  }
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      options: {
        transform: [require('babelify').configure({
          compact: true,
          sourceMaps: true
        })]
      },
      dist: {
        options: {
          browserifyOptions: {
            debug: true,
            standalone: 'sqliteParser'
          }
        },
        src: ['index.js'],
        dest: 'dist/sqlite-parser.js'
      },
      interactive: {
        options: {
          alias: {
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
          src: ['index.html'],
          expand: true,
          cwd: 'src/demo/',
          dest: '.tmp/'
        }, {
          src: ['sqlite-parser.js'],
          expand: true,
          cwd: 'dist/',
          dest: '.tmp/js/'
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
      build: ['.tmp/*.js', 'lib/*.js'],
      dist: ['dist/*.js'],
      interactive: ['.tmp/**/*'],
      demo: ['demo/**/*'],
      testProcess: ['test/sql/official-suite/**/*.sql']
    },
    shell: {
      build: {
        options: {
          failOnError: true
        },
        command: getCmdString('pegjs')
      },
      test: {
        options: {
          failOnError: true
        },
        command: getCmdString('mocha', '--reporter=list')
      },
      testAll: {
        options: {
          failOnError: true
        },
        command: `ALL_TESTS=true ${getCmdString('mocha', '--reporter=list --timeout=90000')}`
      },
      debug: {
        options: {
          failOnError: false,
          debounceDelay: 500,
          forever: true
        },
        command: `DEBUG=true ${getCmdString('mocha', '--reporter=list')}`
      },
      rewrite: {
        options: {
          failOnError: true
        },
        command: `REWRITE=true ${getCmdString('mocha', '--reporter=list')}`
      },
      testProcess: {
        options: {
          failOnError: true,
          execOptions: {
            cwd: path.normalize(`${process.cwd()}/test/misc/`)
          }
        },
        command: `sh process-tests.sh`
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
      test: {
        options: {
          debounceDelay: 250,
          livereload: false
        },
        files: [
          'index.js', 'test/**/*.js', 'src/*.js', 'src/*.pegjs',
          'test/sql/**/*.sql', 'test/json/**/*.json', 'Gruntfile.js'
        ],
        tasks: ['build', 'shell:test']
      },
      debug: {
        options: {
          debounceDelay: 250,
          livereload: false
        },
        files: [
          'index.js', 'test/**/*.js', 'src/*.js', 'src/*.pegjs',
          'test/sql/**/*.sql', 'test/json/**/*.json', 'Gruntfile.js'
        ],
        tasks: ['build', 'shell:debug']
      },
      interactive: {
        options: {
          debounceDelay: 1000,
          livereload: {
            directory: '.tmp/',
            port: 35729
          },
        },
        files: [
          'index.js', 'src/**/*.{js,css,html,pegjs}', 'Gruntfile.js'
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
          'demo/js/sqlite-parser-demo.js': ['.tmp/js/sqlite-parser-demo.js'],
          'demo/js/sqlite-parser.js': ['.tmp/js/sqlite-parser.js']
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
            'dist/sqlite-parser.js'
          ]
        }
      },
      demolib: {
        options: {
          banner: getBanner(false)
        },
        files: {
          src: [
            'demo/js/sqlite-parser.js'
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
            'demo/css/sqlite-parser-demo.css'
          ]
        }
      }
    },
    replace: {
      options: {
        patterns: [
          {
            match: 'VERSION',
            replacement: '<%= pkg.version %>'
          }
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/',
          src: 'sqlite-parser*.js',
          dest: 'dist/'
        }]
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', [
    'build'
  ]);
  grunt.registerTask('build', [
    'clean:build', 'shell:build', 'copy:build'
  ]);
  grunt.registerTask('test', [
    'build', 'shell:test'
  ]);
  grunt.registerTask('testall', [
    'build', 'shell:testAll'
  ]);
  grunt.registerTask('testprocess', [
    'clean:testProcess', 'shell:testProcess'
  ]);
  grunt.registerTask('testwatch', [
    'test', 'watch:test'
  ]);
  grunt.registerTask('debug', [
    'build', 'shell:debug', 'watch:debug'
  ]);
  grunt.registerTask('rewrite-json', [
    'build', 'shell:rewrite'
  ]);
  grunt.registerTask('interactive', [
    'clean:interactive', 'minidist', 'copy:interactive',
    'cssmin:interactive', 'browserify:interactive'
  ]);
  grunt.registerTask('live', [
    'interactive', 'connect:server', 'watch:interactive'
  ]);
  grunt.registerTask('demo', [
    'interactive', 'clean:demo', 'copy:demo', 'uglify:demo',
    'usebanner:demo', 'usebanner:demolib'
  ]);
  grunt.registerTask('minidist', [
    'default', 'clean:dist', 'browserify:dist', 'replace:dist'
  ]);
  grunt.registerTask('dist', [
    'minidist', 'uglify:dist', 'usebanner:dist'
  ]);
  grunt.registerTask('release', [
    'test', 'demo', 'dist', 'clean:interactive'
  ]);
};
