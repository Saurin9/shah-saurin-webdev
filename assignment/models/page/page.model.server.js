module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var PageModel = mongoose.model("PageModel", PageSchema);

    var Q = require("q");

    var api = {
        setModel: setModel,
        createPage: createPage,
        findPageByWebsiteId: findPageByWebsiteId,
        findPageById: findPageById,
        deletePage: deletePage,
        updatePage: updatePage
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function findPageByWebsiteId(websiteId) {
        var deferred = Q.defer();
        PageModel
            .find({"_website": websiteId}, function (err, pages) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(pages);
                }
            });
        return deferred.promise;
    }

    function createPage(websiteId, page) {
        var deferred = Q.defer();
        page._website = websiteId;
        PageModel
            .create(page, function (err, page) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(page);
                }
            });
        return deferred.promise;
    }

    function findPageById (pageId) {
        var deferred = Q.defer();
        PageModel
            .findOne({"_id": pageId}, function (err, page) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(page);
                }
            });
        return deferred.promise;
    }


    function deletePage(pageId) {
        var deferred = Q.defer();
        PageModel
            .remove({"_id":pageId}, function (err, page) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(page);
                }
            });
        return deferred.promise;
    }

    function updatePage(pageId, page) {
        var deferred = Q.defer();
        PageModel
            .update({"_id":pageId}, {name: page.name, description: page.description,}, function (err, page) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(page);
                }
            });
        return deferred.promise;
    }
};