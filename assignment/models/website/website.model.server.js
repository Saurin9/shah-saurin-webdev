module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

    var Q = require("q");

    var api = {
        setModel: setModel,
        createWebsite: createWebsite,
        findWebsitesByUser: findWebsitesByUser,
        // findWebsiteById: findWebsiteById,
        // deleteWebsite: deleteWebsite,
        // updateWebsite: updateWebsite
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function findWebsitesByUser(userId) {
        var deferred = Q.defer();
        WebsiteModel
            .find({"_user": userId}, function (err, user) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function createWebsite(userId, website) {
        var deferred = Q.defer();
        WebsiteModel
            .create(website, function (err, user) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    // function findWebsiteById () {
    //
    // }

    //
    // function deleteWebsite() {
    //
    // }

    // function updateWebsite() {
    //
    // }
};