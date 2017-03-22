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
        deleteAllWidgetsForPage: deleteAllWidgetsForPage
        //reorderWidget: reorderWidget
    };
    return api;

    function setModel(_model) {
        model = _model;
    }

    function deleteAllWidgetsForPage (widgets) {
        var deferred = Q.defer();
        var widgetList = [];
        for (var i = 0; i < widgets.length; i++) {
            widgetList.push(widgets[i]);
        }
        for (var w in widgetList) {
            WidgetModel
                .remove({_id: widgets[w]}, function (err, widget) {
                    if (err) {
                        deferred.abort(err);
                    } else {
                        deferred.resolve(widget);
                    }
                });
        }
        deferred.resolve(widgets);
        return deferred.promise;
    }
    
    function findWidgetsByPageId(pageId) {
        var deferred = Q.defer();
        WidgetModel
            .find({"_page": pageId}, function (err, widgets) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(widgets);
                }
            });
        return deferred.promise;
    }

    function createWidget(pageId, widget) {
        var deferred = Q.defer();
        widget._page = pageId;
        WidgetModel
            .create(widget, function (err, widget) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(widget);
                }
            });
        return deferred.promise;
    }

    function findWidgetById (widgetId) {
        var deferred = Q.defer();
        WidgetModel
            .findOne({"_id": widgetId}, function (err, widget) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(widget);
                }
            });
        return deferred.promise;
    }


    function deleteWidget(widgetId) {
        var deferred = Q.defer();
        WidgetModel
            .remove({"_id": widgetId}, function (err, widget) {
                if(err){
                    deferred.abort(err);
                } else{
                    console.log(widget);
                    deferred.resolve(widget);
                }
            });
        return deferred.promise;
    }

    function updateWidget(widgetId, widget) {
        var deferred = Q.defer();
        WidgetModel
            .update({"_id": widgetId},
                    {name: widget.name,
                    description: widget.description,
                    _page: widget._page,
                    widgetType: widget.widgetType,
                    text: widget.text,
                    placeholder: widget.placeholder,
                    url: widget.url,
                    width: widget.width,
                    height: widget.height,
                    rows: widget.rows,
                    size: widget.size,
                    class: widget.class,
                    icon: widget.icon,
                    deletable: widget.deletable,
                    formatted: widget.formatted},
                function (err, widget) {
                    if(err){
                        deferred.abort(err);
                    } else{
                        deferred.resolve(widget);
                    }
            });
        return deferred.promise;
    }

    // function reorderWidget(pageId, start, end) {
    //
    // }
};