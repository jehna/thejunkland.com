module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            files: ['src/**/*', 'templates/**/*', 'content/**/*'],
            tasks: ['build']
        },
        compass: {
            default: {
                options: {
                    sassDir: 'src',
                    cssDir: 'tmp',
                }
            }
        },
        site: {
            default: {
                options: {
                    site: {},
                    extend: {},
                    marked: {},
                    templates: 'templates',
                    defaultTemplate: 'default.html'
                },
                src: 'content',
                dest: 'build'
            }
        },
        replace: {
            inlineCSS: {
                src: ['build/**/*.html'],
                overwrite: true,
                replacements: [{
                    from: '/*inlinestyle*/',
                    to: function(a) {
                        return grunt.file.read('tmp/style.css');
                    }
                }]
            },
            filerev: {
                src: ['build/**/*.html', 'build/**/*.js'],
                overwrite: true,
                replacements: [] // To be manually built
            }
        },
        copy: {
            js: {
                files: [
                    {expand: true, cwd: 'src/', src: ['*.js'], dest: 'build/', filter: 'isFile'}
                ]
            },
            htaccess: {
                src: 'src/.htaccess',
                dest: 'build/.htaccess'
            },
            delayedCSS: {
                src: 'tmp/delayed.css',
                dest: 'build/delayed.css'
            },
            fonts: {
                files: [
                    {expand: true, cwd: 'src/', src: ['*.woff2'], dest: 'build/', filter: 'isFile'}
                ]
            }
        },
        filerev: {
            options: {
                algorithm: 'md5',
                length: 8
            },
            scripts: {
                src: 'build/*.js'
            },
            css: {
                src: 'build/delayed.css'
            }
        },
        cssmin: {
            default: {
                files: [{
                    expand: true,
                    src: ['tmp/*.css']
                }]
            }
        },
        htmlmin: {
            default: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    src: ['build/**/*.html']
                }]
            }
        },
        browserSync: {
            bsFiles: {
                src : 'build/**/*'
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: 'build/',
                    index: 'build/index.html'
                }
            }
        },
        responsive_images: {
            default: {
                options: {
                    sizes: [{
                        width: 702,
                        rename: false
                    }]
                },
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'tmp/'
                }]
            }
        },
        imagemin: {
            default: {
                files: [{
                    expand: true,
                    cwd: 'tmp/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/'
                }]
            }
        },
        clean: {
            before: ['build/**/*'],
            after: ['tmp']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-markdown-site');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-responsive-images');

    grunt.registerTask('build', [
        'clean:before', // First clean old build dir
        'compass', // Compile styles to /tmp
        'cssmin', // Minify the CSS in /tmp
        'copy', // Copy ready files to /build
        'site', // Compile .md files to /build
        'filerev', // Revision .js and .css files in /build
        'post-filerev', // Covert filerev result to replace config
        'replace', // Fix the filerev's paths in /build folder
        'htmlmin', // Minify HTML
        'responsive_images', // Resize images
        'imagemin', // Minify images
        'clean:after' // Cleanup /tmp
    ]);
    grunt.registerTask('default', ['browserSync', 'build', 'watch']);
    
    grunt.registerTask('post-filerev', function() {
        var mapped = [];
        for(var oldFilename in grunt.filerev.summary) {
            var newFilename = grunt.filerev.summary[oldFilename];
            
            oldFilename = oldFilename.replace(/^build\//, '');
            newFilename = newFilename.replace(/^build\//, '');
            
            mapped.push({
                from: oldFilename,
                to: newFilename
            });
        }
        grunt.config('replace.filerev.replacements', mapped);
    });
};
