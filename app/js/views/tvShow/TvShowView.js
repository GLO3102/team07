define([
    'jquery',
    'underscore',
    'backbone',
    'models/tvshow/TvShowModel',
    'views/YoutubeView',
    'views/tvShow/EpisodeView',
    'views/tvShow/ModalView',
    'text!templates/tvShow/tvShowTemplate.html',
    'collections/tvshow/TvShowCollection'
], function($, _, Backbone, tvModel, YoutubeView, EpisodeView, ModalView, tvShowTemplate, TvShowCollection){

    var TvShowView = Backbone.View.extend({
        el: $("#page"),

        events: {
            "click #something" : "modalWindow"
        },


        template: _.template(tvShowTemplate),
        initialize: function (tvmodel) {
            var self = this;
            var tvShowViewScope = this;

            this.tvShowModel = tvmodel;
            this.artistId = this.id;
            this.tvShowModel.fetch({
                success: function () {
                    tvShowViewScope.render();
                    this.episodesView = new EpisodeView(self.artistId);
                }
            });
            return this;
        },

        render: function () {
            this.$el.html(this.template(this.tvShowModel.toJSON()));
            this.videoPreview = new YoutubeView(this.tvShowModel.get('collectionName'));
        },

        modalWindow: function(e){
            e.preventDefault();
            var episodeId = $(e.target).attr('id');

            this.mView = new ModalView(this.id, episodeId);

        }
    });

    return TvShowView;
});
