var AppState = {
    username: ""
};

var Family = ["Nick", "John", "Eli"];

var StartView = Backbone.View.extend({

    template: _.template($('#start').html()),

    events: {
        "click .btnCheck": "check" // ���������� ����� �� ������ "���������"
    },

    check: function (event) {
        AppState.username = this.$el.find("input:text").val(); // ���������� ����� ������������
        if (_.detect(Family, function (elem) { return elem == AppState.username })) { // �������� ����� ������������
            controller.navigate("success", true); // ������� �� �������� success
            console.log('success');
        } else {
            controller.navigate("error", true); // ������� �� �������� error
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
        "(/)": "start", // ��������� ��������
        "success": "success", // ���� �����
        "error": "error" // ���� ������
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

var controller = new Controller(); // ������ ����������

Backbone.history.start();  // ��������� HTML5 History push