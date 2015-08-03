var AppState = {
    username: ""
};

var Family = ["Nick", "John", "Eli"];

var StartView = Backbone.View.extend({

    template: _.template($('#start').html()),

    events: {
        "click .btnCheck": "check" // Обработчик клика на кнопке "Проверить"
    },

    check: function (event) {
        AppState.username = this.$el.find("input:text").val(); // Сохранение имени пользователя
        if (_.detect(Family, function (elem) { return elem == AppState.username })) { // Проверка имени пользователя
            controller.navigate("success", true); // переход на страницу success
            console.log('success');
        } else {
            controller.navigate("error", true); // переход на страницу error
            console.log('error');
        }
    },

    render: function () {
        this.$el.html(this.template());
        $('#block').append(this.$el);
    }
});

var SuccessView = Backbone.View.extend({

    template: _.template($('#success').html()),

    render: function () {
        this.$el.html(this.template(AppState));
        $('#block').append(this.$el);
    }
});

var ErrorView = Backbone.View.extend({

    template: _.template($('#error').html()),

    render: function () {
        this.$el.html(this.template(AppState));
        $('#block').append(this.$el);
    }
});

var Controller = Backbone.Router.extend({
    routes: {
        "(/)": "start", // Начальная страница
        "success": "success", // Блок удачи
        "error": "error" // Блок ошибки
    },

    start: function () {
        if (this.current) {
            this.current.remove();
        }
        this.current = new StartView();
        this.current.render();
    },

    success: function () {
        if (this.current) {
            this.current.remove();
        }
        this.current = new SuccessView();
        this.current.render();
    },

    error: function () {
        if (this.current) {
            this.current.remove();
        }
        this.current = new ErrorView();
        this.current.render();
    }
});

var controller = new Controller(); // Создаём контроллер

Backbone.history.start();  // Запускаем HTML5 History push