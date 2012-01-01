$(function() {
    window.Poll = Backbone.Model.extend({
    urlRoot: 'polls'
    });

    window.PollCollection = Backbone.Collection.extend({
        model: Poll,
        url: '/polls'
    });

    var AppRouter = Backbone.Router.extend({
        routes: {
            '' : 'createPoll',
            'polls/:id' : 'showPoll'
        },
        createPoll: function() {
            this.pollCreateView = new PollCreateView();
            this.pollCreateView.render();
        },
        showPoll: function(id) {
            this.poll = new Poll({id: id});
            this.poll.fetch();
            this.pollShowView = new PollShowView({model: this.poll});
            this.pollShowView.render();
            window.what = this.poll;
        }
    });

    window.PollCreateView = Backbone.View.extend({
        el: $('#main_area'),
        template: _.template($('#poll_create_view').html()),
        render: function(eventName) {
            $(this.el).html(this.template({}));
            return this;
        }
    });

    window.PollShowView = Backbone.View.extend({
        el: $('#main_area'),
        template: _.template($('#poll_show_view').html()),
        render: function(eventName) {
            $(this.el).html(this.template({}));
            return this;
        }
    });

    var app = new AppRouter();
    Backbone.history.start();
});
