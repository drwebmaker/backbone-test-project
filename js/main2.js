/**
 * Created by valeriy.abornyev on 9/17/2015.
 */

//Модель человека
var Person = Backbone.Model.extend({
    defaults: {
        name: 'Иван Петров',
        age: 40,
        job: 'слесарь'
    }
});

var person = new Person();

//Список людей
var PeopleCollection = Backbone.Collection.extend({
    model: Person
});


//Вид одного человека
var PersonView = Backbone.View.extend({
    tagName: 'li',

    template: _.template('<strong><%= name %></strong> ( <%= age %> ) - <%= job %>'),

    initialize: function() {
        this.render();
    },

    render: function() {
        //замечательный шаблон
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    }
});


var peopleCollection = new PeopleCollection([
    {
        name: 'Петр',
        age: 20,
        job: 'Таксист'
    },
    {
        name: 'Олег',
        age: 24,
        job: 'Менеджер'
    },
    {
        name: 'Анна',
        age: 18,
        job: 'Студентка'
    }
]);

//Вид списка людей
var PeopleView = Backbone.View.extend({
    tagName: 'ul',

    initialize: function() {
    },

    render: function() {
        this.collection.each(function(person) {
            var personView = new PersonView({model: person});
            this.$el.append(personView.render().el);
        }, this);

        return this;
    }

});

var peopleView = new PeopleView({collection: peopleCollection});

$(document.body).append(peopleView.render().el);