module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var Q = require("q");

    var api = {
        setModel: setModel,
        createWidget: createWidget,
        findWidgetsByPageId: findWidgetsByPageId,
        findWidgetById: findWidgetById,
        deleteWidget: deleteWidget,
        updateWidget: updateWidget,
        reorderWidget: reorderWidget
    };
    return api;

    function setModel(_model) {
        model = _model;
    }
    //
    // function findWidgetsByPageId(psgeId) {
    //     var deferred = Q.defer();
    //     PageModel
    //         .find({"_website": websiteId}, function (err, pages) {
    //             if(err){
    //                 deferred.abort(err);
    //             } else{
    //                 deferred.resolve(pages);
    //             }
    //         });
    //     return deferred.promise;
    // }
    //
    // function createWidget(pageId, widget) {
    //     var deferred = Q.defer();
    //     page._website = websiteId;
    //     PageModel
    //         .create(page, function (err, page) {
    //             if(err){
    //                 deferred.abort(err);
    //             } else{
    //                 deferred.resolve(page);
    //             }
    //         });
    //     return deferred.promise;
    // }
    //
    // function findWidgetById (widgetId) {
    //     var deferred = Q.defer();
    //     PageModel
    //         .findOne({"_id": pageId}, function (err, page) {
    //             if(err){
    //                 deferred.abort(err);
    //             } else{
    //                 deferred.resolve(page);
    //             }
    //         });
    //     return deferred.promise;
    // }
    //
    //
    // function deleteWidget(widgetId) {
    //     var deferred = Q.defer();
    //     PageModel
    //         .remove({"_id":pageId}, function (err, page) {
    //             if(err){
    //                 deferred.abort(err);
    //             } else{
    //                 deferred.resolve(page);
    //             }
    //         });
    //     return deferred.promise;
    // }
    //
    // function updateWidget(widgetId, widget) {
    //     var deferred = Q.defer();
    //     PageModel
    //         .update({"_id":pageId}, {name: page.name, description: page.description,}, function (err, page) {
    //             if(err){
    //                 deferred.abort(err);
    //             } else{
    //                 deferred.resolve(page);
    //             }
    //         });
    //     return deferred.promise;
    // }
    //
    // function reorderWidget(pageId, start, end) {
    //
    // }
};