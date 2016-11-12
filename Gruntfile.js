var path = require('path');
var fs = require('fs');

module.exports = function(grunt) {
  function getBanner(isDemo, isBin) {
    return (isBin ? '#!/usr/bin/env node\n' : '') +
      '/*!\n' +
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
    pegjs: `--trace --cache --optimize size --allowed-start-rules 'start,start_streaming' --output src/parser.js src/grammar.pegjs`
  };

  const tmpDir = './.tmp/';
  if (!fs.existsSync(tmpDir)){
    fs.mkdirSync(tmpDir);
  }
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    babel: {
      options: {
        compact: true,
        comments: false,
        sourceMaps: false,
        presets: ['es2015'],
        plugins: ['add-module-exports']
      },
      build: {
        options: {
          sourceMaps: 'inline'
        },
        files: [{
          src: ['*.js'],
          expand: true,
          cwd: 'src/',
          dest: '.tmp/'
        }]
      },
      demo: {
        files: [{
          src: ['*.js'],
          expand: true,
          cwd: 'src/',
          dest: '.tmp/'
        }]
      },

      bin: {
        files: {
          'bin/sqlite-parser': 'src/bin/sqlite-parser.js'
        }
      }
    },


    browserify: {
      interactive: {
        options: {
          alias: {
            'codemirror': './node_modules/codemirror/lib/codemirror',
            'foldcode': './node_modules/codemirror/addon/fold/foldcode',
            'foldgutter': './node_modules/codemirror/addon/fold/foldgutter',
            'brace-fold': './node_modules/codemirror/addon/fold/brace-fold',
            'panel': './node_modules/codemirror/addon/display/panel',
            'mode-javascript': './node_modules/codemirror/mode/javascript/javascript',
            'mode-sql': './node_modules/codemirror/mode/sql/sql',
            'sqlite-parser': './.tmp/index.js',
            './streaming': './.tmp/streaming-shim.js'
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
        dest: '.tmp/sqlite-parser-demo.js'
      },
      browser: {
        options: {
          browserifyOptions: {
            debug: false,
            standalone: 'sqliteParser'
          },
          alias: {
            './streaming': './.tmp/streaming-shim.js'
          }
        },
        src: ['.tmp/index.js'],
        dest: '.tmp/sqlite-parser.js'
      }
    },

    copy: {
      release: {
        files: [{
          filter: 'isFile',
          expand: true,
          cwd: '.tmp/',
          src: [
            'index.js', 'parser.js', 'streaming.js', 'streaming-shim.js', 'tracer.js'
          ],
          dest: 'lib/'
        }]
      },
      interactive: {
        files: [{
          src: ['index.html'],
          expand: true,
          cwd: 'src/demo/',
          dest: '.tmp/'
        }],
      },
      demo: {
        src: ['*.{html,css}'],
        expand: true,
        cwd: '.tmp/',
        dest: 'demo/'
      },
      browser: {
        src: 'sqlite-parser.js',
        dest: 'dist/',
        expand: true,
        cwd: '.tmp/'
      }
    },

    clean: {
      build: ['.tmp/*.js', 'src/parser.js'],
      interactive: ['.tmp/*.css'],
      demo: ['demo/**/*'],
      browser: ['dist/**/*'],
      release: ['lib/**/*'],
      bin: ['bin/**/*'],
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
        command: `ALL_TESTS=true ${getCmdString('mocha', '--reporter=list --timeout=45000')}`
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
          'test/**/*.js', 'src/*.js', 'src/*.pegjs',
          'test/sql/**/*.sql', 'test/json/**/*.json', 'Gruntfile.js'
        ],
        tasks: [ 'test' ]
      },
      debug: {
        options: {
          debounceDelay: 250,
          livereload: false
        },
        files: [
          'test/**/*.js', 'src/*.js', 'src/*.pegjs',
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
          'src/**/*.{js,css,html,pegjs}', 'Gruntfile.js'
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
      demo: {
        files: {
          'demo/sqlite-parser-demo.js': ['.tmp/sqlite-parser-demo.js']
        }
      },
      browser: {
        files: {
          'dist/sqlite-parser.js': '.tmp/sqlite-parser.js'
        }
      }
    },

    cssmin: {
      interactive: {
        options: {
          processImport: true
        },
        files: {
          '.tmp/sqlite-parser-demo.css': [
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
      release: {
        options: {
          banner: getBanner(false)
        },
        files: [{
          filter: 'isFile',
          expand: true,
          cwd: 'lib/',
          src: ['*.js'],
          dest: 'lib/'
        }]
      },
      browser: {
        options: {
          banner: getBanner(false)
        },
        files: {
          src: ['dist/sqlite-parser.js']
        }
      },
      demo: {
        options: {
          banner: getBanner(true)
        },
        files: {
          src: [
            'demo/sqlite-parser-demo.js',
            'demo/sqlite-parser-demo.css'
          ]
        }
      },
      bin: {
        options: {
          banner: getBanner(false, true)
        },
        files: {
          src: [
            'bin/sqlite-parser'
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
      interactive: {
        files: [{
          expand: true,
          cwd: '.tmp/',
          src: 'index.js',
          dest: '.tmp/'
        }]
      },
      browser: {
        files: [{
          src: '.tmp/sqlite-parser.js',
          dest: '.tmp/sqlite-parser.js'
        }]
      },
      bin: {
        files: [{
          src: 'bin/sqlite-parser',
          dest: 'bin/sqlite-parser'
        }]
      }
    },

    concurrent: {
      interactive: [
        'copy:interactive',
        'browserify:interactive'
      ],
      live: [
        'interactive',
        [ 'clean:interactive', 'cssmin:interactive' ]
      ],
      demo1: [
        'cssmin:interactive',
        [ 'demobuild', 'replace:interactive', 'shell:test', 'concurrent:interactive' ]
      ],
      demo2: [
        'uglify:demo',
        'copy:demo'
      ],
      release: [
        'releaseall',
        'bin'
      ],
      releaseall: [
        [ 'clean:release', 'copy:release', 'usebanner:release' ],
        [
          'clean:browser',
          'browserify:browser',
          // 'uglify:browser',
          'copy:browser',
          'usebanner:browser'
        ],
      ]
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', [
    'dist'
  ]);
  // Create new build of the parser in .tmp/ folder
  grunt.registerTask('build', [
    'clean:build',
    'shell:build',
    'babel:build'
  ]);
  // Create new lib/ folder containing the release version of the parser
  grunt.registerTask('dist', [
    'demobuild',
    'clean:release',
    'copy:release',
    'usebanner:release'
  ]);
  // Create minified browserified bundle of parser at dist/sqlite-parser.js
  grunt.registerTask('browser', [
    'demobuild',
    'clean:browser',
    'browserify:browser',
    'replace:browser',
    // 'uglify:browser',
    'copy:browser',
    'usebanner:browser'
  ]);
  // Create new version of command line utility at bin/sqlite-parser
  grunt.registerTask('bin', [
    'clean:bin',
    'babel:bin',
    'replace:bin',
    'usebanner:bin'
  ]);
  // Build parser to .tmp/ and run tests
  grunt.registerTask('test', [
    'build', 'shell:test'
  ]);
  // Build parser to .tmp/ and run extended test suite
  grunt.registerTask('testall', [
    'build', 'shell:testAll'
  ]);
  // Re-process every .test file in test/raw/ to .sql files in
  // test/sql/official-suite
  grunt.registerTask('testprocess', [
    'clean:testProcess', 'shell:testProcess'
  ]);
  // Watch the parser and then build to .tmp/ and run tests on changes
  grunt.registerTask('testwatch', [
    'test', 'watch:test'
  ]);
  // Is testwatch but also logs the generated ASTs as formatted JSON
  // objects in the test output
  grunt.registerTask('debug', [
    'build', 'shell:debug', 'watch:debug'
  ]);
  // Build the parser to .tmp/ and run tests, but take the output from the
  // parser use it to overwrite the existing test JSON files in test/json/
  grunt.registerTask('rewritejson', [
    'build', 'shell:rewrite'
  ]);
  // Rebuild the interactive demo site to .tmp/
  grunt.registerTask('interactive', [
    'build',
    'concurrent:interactive'
  ]);
  // Watch the parser and demo files and then build parser and interactive
  // demo to .tmp/ on changes
  grunt.registerTask('live', [
    'concurrent:live',
    'connect:server',
    'watch:interactive'
  ]);
  // Build the interactive demo as a index.html and one minified CSS and
  // one minified JS bundle to the demo/ folder
  grunt.registerTask('demo', [
    'clean:demo',
    'concurrent:demo1',
    'concurrent:demo2',
    'usebanner:demo'
  ]);
  // Build the parser to .tmp/ but do not include the inline sourcemaps
  grunt.registerTask('demobuild', [
    'clean:build',
    'shell:build',
    'babel:demo'
  ]);
  // Create new command line parser at bin/sqlite-parser, create release
  // version of the parser in lib/ and then create a new copy of the
  // release version of the interactive demo in demo/
  grunt.registerTask('release', [
    'concurrent:release'
  ]);
  grunt.registerTask('releaseall', [
    'demo',
    'concurrent:releaseall'
  ]);
};
