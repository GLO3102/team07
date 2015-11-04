define([
    'jquery',
    'underscore',
    'backbone',
    'models/tvshow/EpisodeModel',
    'text!templates/tvShow/tvShowEpisodeTemplate.html'
], function($, _, Backbone, EpisodeModel, TvEpisodeTemplate) {
    var EpisodeView = Backbone.View.extend({
        template: _.template(TvEpisodeTemplate),

        initialize: function (collectionId) {

            this.model = new EpisodeModel({collectionId: collectionId});
            this.model.set("collectionId", collectionId);

            var self = this;
            //var renderView = _.after(1, function () {
            //    self.render();
            //});
            this.model.fetch({

                success: function (tvShow) {
                    //console.log(tvShow.defaults.collectionHdPrice);
                    self.tvShow = tvShow;
                    self.render();
                }
            });
            return this;
        },

        render: function() {
            //console.log(this.model.attributes);


            $(".episode-list").html(this.template({tvShows: this.tvShow.attributes.results}));
            //console.log(this.model.attributes.results[5]);

            return this;
        }
    });

    return EpisodeView;
});
