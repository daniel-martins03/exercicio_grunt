module.exports = function(grunt) {
    // Configuração do projeto
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Configuração do LESS
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    'css/style.css': 'less/style.less'
                }
            }
        },

        // Configuração do Uglify (minificação do JS)
        uglify: {
            options: {
                mangle: true,
                compress: {
                    drop_console: true
                }
            },
            my_target: {
                files: {
                    'js/app.min.js': ['js/*.js']
                }
            }
        },

        // Configuração do JSHint
        jshint: {
            files: ['js/*.js', 'js/lint/*.js'],
            options: {
                esversion: 6,
                curly: true,
                eqeqeq: true,
                forin: true,
                freeze: true,
                undef: true,
                globals: {
                    jQuery: true
                }
            }
        },

        // Configuração do Watch
        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['jshint', 'uglify'],
                options: {
                    spawn: false
                }
            },
            styles: {
                files: ['less/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false
                }
            }
        }
    });

    // Carrega os plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Registra as tarefas
    grunt.registerTask('default', ['less', 'jshint', 'uglify']);
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('build', ['less', 'uglify']);
};