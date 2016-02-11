requirejs.config({
    baseUrl: './libs',
    paths: {
        'marfeel': '../js/app',
        'controllers': '../js/app/controllers',
        'services': '../js/app/services',
        'entities': '../js/app/services/entities',
    }
});

requirejs(['marfeel/app']);