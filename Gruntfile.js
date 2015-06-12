module.exports = function(grunt) {
  grunt.initConfig({
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
      main: ['lib/**/*.js']
      // , dist: ['dist/**/*.js']
    },
    shell: {
      pegjs: {
        options: {
          failOnError: true
        },
        command: './node_modules/.bin/pegjs src/sql-grammar.pegjs lib/sql-parser.js'
      },
      test: {
        options: {
          failOnError: true
        },
        command: './node_modules/.bin/mocha test/index-spec.js --reporter="nyan"'
      },
      debug: {
        options: {
          failOnError: false,
          debounceDelay: 500,
          forever: true
        },
        command: 'DEBUG=true ./node_modules/.bin/mocha test/index-spec.js --reporter="list"'
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
        files: ['Gruntfile.js', 'test/*.js', 'src/*.js', 'src/*.pegjs', 'test/sql/*.sql'],
        tasks: ['default', 'shell:debug']
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['clean:main', 'shell:pegjs', 'copy:main']);
  grunt.registerTask('test', ['default', 'shell:test']);
  grunt.registerTask('debug', ['default', 'shell:debug', 'watch:debug']);
  grunt.registerTask('json', ['default', 'shell:json']);
};
