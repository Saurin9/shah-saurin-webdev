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
        findWebsiteById: findWebsiteById,
        deleteWebsite: deleteWebsite,
        updateWebsite: updateWebsite,
        addPageToWebsite: addPageToWebsite
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function addPageToWebsite(websiteId, page) {
        var deferred = Q.defer();

        WebsiteModel
            .update({_id:websiteId},{$push:{pages:page._id}},function (err,website) {
                if(err){
                    deferred.abort();
                }else {
                    deferred.resolve(website);
                }
            });
        return deferred.promise;
    }

    function findWebsitesByUser(userId) {
        var deferred = Q.defer();
        WebsiteModel
            .find({"_user": userId}, function (err, websites) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(websites);
                }
            });
        return deferred.promise;
    }

    function createWebsite(userId, website) {
        var deferred = Q.defer();
        website._user = userId;
        WebsiteModel
            .create(website, function (err, website) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(website);
                }
            });
        return deferred.promise;
    }

    function findWebsiteById (websiteId) {
        var deferred = Q.defer();
        WebsiteModel
            .findOne({"_id": websiteId}, function (err, website) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(website);
                }
            });
        return deferred.promise;
    }


    function deleteWebsite(websiteId) {
        var deferred = Q.defer();
        WebsiteModel
            .remove({"_id":websiteId}, function (err, website) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(website);
                }
            });
        return deferred.promise;
    }

    function updateWebsite(websiteId, website) {
        var deferred = Q.defer();
        WebsiteModel
            .update({"_id":websiteId}, {name: website.name, description: website.description,}, function (err, website) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(website);
                }
            });
        return deferred.promise;
    }
};