module.exports = function(grunt){

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    coffee: {
      compile: {
        files: {
          'build/js/main.js': 'assets/coffee/main.coffee'
        }
      }
    },

    jade: {
      options: {
        pretty: true
      },
      compile: {
        files: {
          'build/index.html': 'assets/jade/index.jade'
        }
      }
    },

    sass: {
      build: {
        files: {
          'build/css/main.css' : 'assets/sass/main.sass'
        }
      }
    },

    watch: {
      js: {
        files: ['assets/coffee/main.coffee'],
        tasks: ['coffee']
      },
      jade: {
        files: ['assets/jade/index.jade'],
        tasks: ['jade']
      },
      css: {
        files: ['assets/sass/main.sass'],
        tasks: ['sass']
      }
    }
  })

  grunt.registerTask('default', [])

}