/*!
 * Auto-Suggest E-Mail Gruntfile
 * Copyright 2015 Marcel Fetten (http://www.fetten-meier.com)
 */

module.exports = function (grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';


    // Project configuration.
    grunt.initConfig({

        // Metadata
        pkg: grunt.file.readJSON('package.json'),

        banner: '/*!\n' +
        ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
        ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed under the <%= pkg.license %> license\n' +
        ' */\n',


        // Task configuration
        clean: {
            dist: ['dist/*.*']
        },

        jshint: {
            options: {
                jshintrc: './.jshintrc'
            },
            dist: {
                src: 'src/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                preserveComments: 'some'
            },
            dist: {
                src: [
                    'src/<%= pkg.name %>.js'
                ],
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },

        usebanner: {
            options: {
                position: 'top',
                banner: '<%= banner %>'
            },
            files: {
                src: [
                    'dist/**/*.js'
                ]
            }
        },

        copy: {
            dist: {
                cwd: 'src',
                src: [
                    '<%= pkg.name %>.js'
                ],
                dest: 'dist/',
                expand: true
            }
        }

    });

    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
    require('time-grunt')(grunt);

    grunt.registerTask('lint', [
        'jshint:dist'
    ]);

    grunt.registerTask('dist', [
        'clean:dist',
        'copy:dist',
        'uglify:dist',
        'usebanner'
    ]);

    grunt.registerTask('default', ['dist']);
};