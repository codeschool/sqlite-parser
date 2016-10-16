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
        options: {
          sourceMaps: false
        },
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
      }
    },

    clean: {
      build: ['.tmp/*.js', 'src/parser.js'],
      interactive: ['.tmp/*.css'],
      demo: ['demo/**/*'],
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
      bin: {
        files: {
          'bin/sqlite-parser': ['bin/sqlite-parser']
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
      ]
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', [
    'build'
  ]);
  grunt.registerTask('build', [
    'clean:build',
    'shell:build',
    'babel:build'
  ]);

  grunt.registerTask('bin', [
    'clean:bin',
    'babel:bin',
    'replace:bin',
    'usebanner:bin'
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
    'build',
    'concurrent:interactive'
  ]);
  grunt.registerTask('live', [
    'concurrent:live',
    'connect:server',
    'watch:interactive'
  ]);

  grunt.registerTask('demo', [
    'clean:demo',
    'concurrent:demo1',
    'concurrent:demo2',
    'usebanner:demo'
  ]);
  grunt.registerTask('demobuild', [
    'clean:build',
    'shell:build',
    'babel:demo'
  ]);


  grunt.registerTask('release', [
    'concurrent:release'
  ]);
  grunt.registerTask('releaseall', [
    'demo',
    'clean:release',
    'copy:release',
    'usebanner:release'
  ]);
};
