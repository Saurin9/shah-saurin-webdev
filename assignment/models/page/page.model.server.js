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
        updatePage: updatePage,
        addWidgetToPage: addWidgetToPage,
        removeWidgetFromPage: removeWidgetFromPage,
        removeAllPagesForWebsite: removeAllPagesForWebsite
    };
    return api;

    function setModel(_model) {
        model = _model;
    }
    
    function removeAllPagesForWebsite (pages) {
        var deferred = Q.defer();

        var pageList = [];
        for(var i = 0; i < pages.length ; i++) {
            pageList.push(pages[i]);
        }

        for(var p in pageList) {
            var pageId = pageList[p];
            PageModel
                .findOne({_id: pageId}, function (err, page) {
                    if (err) {
                        deferred.abort(err);
                    } else {
                        model
                            .widgetModel
                            .deleteAllWidgetsForPage(page.widgets)
                            .then(
                                function () {
                                    PageModel
                                        .remove({_id: page._id}, function (err, page) {
                                            if (err) {
                                                deferred.abort(err);
                                            } else {
                                                deferred.resolve(page);
                                            }
                                        });
                                    deferred.resolve(page);
                                },
                                function (err) {
                                    deferred.abort(err);
                                }
                            );
                    }
                });
        }
        deferred.resolve(pages);
        return deferred.promise;
    }

    function addWidgetToPage(widget) {
        var deferred = Q.defer();
        PageModel
            .update({"_id": widget._page}, {$push:{widgets: widget._id}}, function (err, page) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(page);
                }
            });
        return deferred.promise;
    }

    function removeWidgetFromPage (widget) {
        var deferred = Q.defer();
        PageModel
            .update({"_id": widget._page}, {$pull:{widgets: widget._id}}, function (err, page) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(page);
                }
            });
        return deferred.promise;
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
            .update({"_id":pageId}, {name: page.name, description: page.description}, function (err, page) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(page);
                }
            });
        return deferred.promise;
    }
};