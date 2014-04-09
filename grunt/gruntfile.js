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

    watch: {
      js: {
        files: ['assets/coffee/main.coffee'],
        tasks: ['coffee']
      },
      jade: {
        files: ['assets/jade/index.jade'],
        tasks: ['jade']
      }
    }
  })

  grunt.registerTask('default', [])

}