(function () {

    angular
        .module("WebAppMaker")
        .factory('WidgetService', WidgetService);

    function WidgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": "2", "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://wallpaper-gallery.net/images/best-wallpaper/best-wallpaper-5.jpg"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum HTML text</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];


        var api = {
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "createWidget": createWidget,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;


        function findWidgetsByPageId(pageId) {
            var widgetsById = [];
            for (var w in widgets){
                if(widgets[w].pageId === pageId){
                    widgetsById.push(widgets[w]);
                }
            }
            return widgetsById;
        }
        
        function findWidgetById(widgetId) {
            for(var w in widgets){
                if(widgets[w]._id === widgetId){
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }
        
        
        function createWidget(new_pageId, widget) {
            var widget_new = {_id: (new Date()).getTime().toString(),
                widgetType: widget.widgetType,
                pageId: new_pageId,
                size: widget.size,
                text: widget.text};
            widgets.push(widget_new);
        }
        
        function updateWidget(widgetId, widget) {

        }

        function deleteWidget(widgetId) {

        }

        


    }



})();