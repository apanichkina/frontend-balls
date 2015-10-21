/**
 * Created by Alex on 21.09.15.
 */

define([
    'backbone',
    'models/scores'
], function(
    Backbone,
    Score
){

    var Collection = Backbone.Collection.extend({
        model: Score,
        firstN: function(n){
            return this.first(n).map(function(model) { return model.attributes;})
        }

    });
    return Collection;
});