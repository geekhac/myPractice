module.exports=function (grunt) {

	// 定义任务,concurrent人物中指定了watch和nodemon任务
	grunt.initConfig({
		watch:{
			jade:{
				files:['views/**'],
				options:{
					livereload:true//当文件改动时重新启动服务
				}
			},
			js:{
				files:['public/js／**','modols/**/*.js','schemas/**/*.js'],
				// tasks:['jshint'],
				options:{
					livereload:true
				}
			}
		},
		nodemon:{
			dev: {
		        script: 'app.js',
		        options: {
	               args: [],
	               nodeArgs: ['--debug'],
	               ignore: ['README.md', 'node_modules/**', '.DS_Store'],
	               ext: 'js',
	               watch: ['./'],
	               delay: 1000,
	               env: {
	                    PORT: '3000'
	               },
	               cwd: __dirname
			    }
			}
		},
		jshint:{
			options:{
				jshintrc:'.jshintrc',
				ignores:['public/libs/**/*.js']
			},
			all:['public/js/*.js','test/**/*.js','app/**/*.js']
		},
		uglify: {
	      development: {
	        files: {
	          'public/build/admin.min.js': 'public/js/admin.js',
	          'public/build/detail.min.js': [
	            'public/js/detail.js'
	          ]
	        }
	      }
	    },
		mochaTest:{
			options:{
				reporter:'spec'
			},
			src:['test/**/*.js']
		},
		concurrent:{
			tasks:['nodemon','watch','jshint','uglify'],
			options:{
				logConcurrentOutput:true
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	// 不因为语法等错误而中断
	grunt.option('force',true);

	// 注册任务，默认是concurrent任务
	grunt.registerTask('default', ['concurrent'])
	grunt.registerTask('test',['mochaTest']);

}