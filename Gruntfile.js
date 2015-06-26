module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        require: ['lib/parser-util.js', 'lib/parser.js'],
        src: ['index.js'],
        dest: 'demo/lib/sqlite-parser-dist.js'
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
      }
    },
    clean: {
      main: ['lib/**/*.js'],
      dist: ['demo/lib/**/*.js']
    },
    shell: {
      pegjs: {
        options: {
          failOnError: true
        },
        command: './node_modules/.bin/pegjs src/grammar.pegjs lib/parser.js'
        // command: './node_modules/.bin/pegjs --trace src/grammar.pegjs lib/parser.js'
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
    watch: {
      debug: {
        files: ['Gruntfile.js', 'index.js', 'test/*.js', 'src/*.js', 'src/*.pegjs', 'test/sql/*.sql'],
        tasks: ['default', 'shell:debug']
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['clean:main', 'shell:pegjs', 'copy:main']);
  grunt.registerTask('test', ['default', 'shell:test']);
  grunt.registerTask('debug', ['default', 'shell:debug', 'watch:debug']);
  grunt.registerTask('json', ['default', 'shell:json']);
  grunt.registerTask('dist', ['default', 'clean:dist', 'browserify:dist']);
};
