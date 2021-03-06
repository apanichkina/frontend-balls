
module.exports = function(grunt) {
  
grunt.initConfig({  


shell: {
    options: {
                stdout: true,
                stderr: true
    },
	server: { /* Подзадача */
    		command: 'java -cp L1.2-1.0-jar-with-dependencies.jar main.Main 8080'
	}
},
/* разобрать fest */
fest: {
    templates: {
        files: [{
            expand: true, // Флаг динамического развертывания
            cwd: 'templates', /* исходная директория */
            src: '*.xml', /* имена шаблонов */
            dest: 'public_html/js/tmpl' /* результирующая директория */
        }],
        options: {
            template: function (data) { /* задаем формат функции-шаблона */
                return grunt.template.process(
                    // 'define(function () { return <%= contents %> ; });',
                    'var <%= name %>Tmpl = <%= contents %> ;', /* присваиваем функцию-шаблон переменной */
                    {data: data}
                );
            }
        }
    }
},
watch: {
	fest: { /* Цель */
    	files: ['templates/*.xml'], /* следим за шаблонами */
    	tasks: ['fest'], /* перекомпилировать */
    	options: {
            interrupt: true,
        	atBegin: true /* запустить задачу при старте */
    	}
	},
	server: { /* Цель */
    	files: [
            'public_html/js/**/*.js', /* следим за статикой */
            'public_html/css/**/*.css'
        ],     	
        options: {
            interrupt: true,
        	livereload: true /* автоматическая перезагрузка */
    	}
	}
},
concurrent: {
    target: ['watch', 'shell'],
    options: {
        logConcurrentOutput: true, /* Вывод процесса логов*/
    }
}, 
any_other_name: 'hello' /* Любое произвольное свойство */
});
// Загрузка плагинов, на примере "concat».
grunt.loadNpmTasks('grunt-contrib-concat');

grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-concurrent');
grunt.loadNpmTasks('grunt-shell');
grunt.loadNpmTasks('grunt-fest');
// Определение задач, default должен быть всегда.
grunt.registerTask('default', ['concurrent']);

};
