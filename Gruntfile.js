module.exports = function(grunt) {
  grunt.initConfig({
    // browserify: {
    //   dist: {
    //     require: ['lib/sql-grammar-codex.js', 'lib/sql-parser-util.js', 'lib/sql-parser.js'],
    //     src: ['lib/index.js'],
    //     dest: 'dist/sql-tag-validator.js'
    //   }
    // },
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
          debounceDelay: 2000,
          forever: true
        },
        command: 'DEBUG=true ./node_modules/.bin/mocha test/index-spec.js --reporter="list"'
      }
    },
    watch: {
      debug: {
        files: ['Gruntfile.js', 'test/*.js', 'src/*.js', 'src/*.pegjs', 'test/sql/*.sql', 'index.js'],
        tasks: ['default', 'shell:debug']
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['clean:main', 'shell:pegjs', 'copy:main']);
  // grunt.registerTask('dist', ['default', 'clean:dist', 'browserify:dist']);
  grunt.registerTask('test', ['default', 'shell:test']);
  grunt.registerTask('debug', ['default', 'watch:debug']);
};
