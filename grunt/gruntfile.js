module.exports = function (grunt) {
  grunt.initConfig({
    pk: grunt.file.readJSON('package.json'),
    sass: {
      build: {
        options:{
          style: 'compressed'
        },
        files: {
          'build/css/master.css': 'assets/sass/master.scss'
        }
      }
    }
  })
  grunt.loadNpmTasks('grunt-contrib-sass')

  grunt.registerTask('default', [])
}