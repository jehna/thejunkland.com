module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            images: {
                files: ['src/images/**/*'],
                tasks: ['responsive_images']
            },
            css: {
                files: ['src/**/*.scss'],
                tasks: ['compass', 'replace:inlineCSS']
            },
            generalFiles: {
                files: ['!src/**/*.scss', 'src/*.*'],
                tasks: ['copy']
            },
            templates: {
                files: ['templates/**/*', 'content/**/*'],
                tasks: ['site', 'replace:inlineCSS']
            }
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
                    site: {
                        pkg: grunt.file.readJSON('package.json')
                    },
                    extend: {},
                    marked: {
                        gfm: true,
                        highlight: function (code, lang) {
                            if (lang == '' || lang == 'nohighlight') {
                                return code;
                            }
                            if (lang == 'bash') {
                                return code.split('\n').map(function(c) {
                                    return '<span class="code-line">' + c + '</span>';
                                }).join('\n');
                            }
                            return require('highlight.js').highlightAuto(code).value;
                        }
                    },
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
                    {expand: true, cwd: 'src/', src: ['*.woff'], dest: 'build/', filter: 'isFile'}
                ]
            },
            sitemap: {
                src: 'build/sitemap.html',
                dest: 'build/sitemap.xml'
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
                    dest: 'build/'
                }]
            },
            retinaPNG: {
                options: {
                    sizes: [{
                        width: 702*2,
                        suffix: '-x2',
                        rename: false
                    }]
                },
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.{png,gif}'],
                    dest: 'build/'
                }]
            }
        },
        imagemin: {
            default: {
                files: [{
                    expand: true,
                    cwd: 'build/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/'
                }]
            }
        },
        clean: {
            before: ['build/**/*'],
            after: ['tmp', 'build/sitemap.html']
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
        'site', // Compile .md files to /build
        'copy', // Copy ready files to /build
        'filerev', // Revision .js and .css files in /build
        'post-filerev', // Covert filerev result to replace config
        'replace:inlineCSS', // Inline the header CSS
        'replace:filerev', // Fix the filerev's paths in /build folder
        'htmlmin', // Minify HTML
        'responsive_images', // Resize images
        'imagemin', // Minify images
        'clean:after' // Cleanup /tmp
    ]);
    
    grunt.registerTask('build-fast', [
        'compass', // Compile styles to /tmp
        'site', // Compile .md files to /build
        'copy', // Copy ready files to /build
        'replace:inlineCSS', // Inline the header CSS
        'responsive_images', // Resize images
    ]);
    grunt.registerTask('default', ['browserSync', 'build-fast', 'watch']);
    
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
