(function () {

    angular
        .module("WebAppMaker")
        .factory('WidgetService', WidgetService);

    function WidgetService($http) {

        // var widgets = [
        //     { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": "2", "text": "GIZMODO"},
        //     { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
        //     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        //         "url": "http://lorempixel.com/400/200/sports"},
        //     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum HTML text</p>"},
        //     { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
        //     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        //         "url": "https://youtu.be/AM2Ivdi9c4E" },
        //     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        // ];


        var api = {
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "createWidget": createWidget,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;


        function findWidgetsByPageId(pageId) {
            return $http.get("/api/page/" + pageId + "/widget");
            // var widgetsById = [];
            // for (var w in widgets){
            //     if(widgets[w].pageId === pageId){
            //         widgetsById.push(widgets[w]);
            //     }
            // }
            // return widgetsById;
        }
        
        function findWidgetById(widgetId) {
            return $http.get("/api/widget/" + widgetId);
            // for(var w in widgets){
            //     if(widgets[w]._id === widgetId){
            //         return angular.copy(widgets[w]);
            //     }
            // }
            // return null;
        }

        function createWidget(pageId, widget) {
            return $http.post("/api/page/" + pageId + "/widget", widget);
            // var newWidget;
            // if(widget.widgetType === "HEADER") {
            //     newWidget = { "_id": (new Date()).getTime().toString(),
            //         "widgetType": widget.widgetType, "pageId": pageId, "size": widget.size, "text": widget.text};
            // } else if (widget.widgetType === "HTML") {
            //     newWidget = { "_id": (new Date()).getTime().toString(),
            //         "widgetType": widget.widgetType, "pageId": pageId, "text": widget.text};
            // } else {
            //     newWidget = { "_id": (new Date()).getTime().toString(),
            //         "widgetType": widget.widgetType, "pageId": pageId, "width": widget.width, "url": widget.url};
            // }
            // widgets.push(newWidget);
            // return angular.copy(newWidget);
        }
        

        function updateWidget(widgetId, widget) {
            return $http.put("/api/widget/" + widgetId, widget);
            // for(var w in widgets) {
            //     var widgetToUpdate = widgets[w];
            //     if (widgetToUpdate._id === widgetId) {
            //         if(widgetToUpdate.widgetType === "HEADER") {
            //             widgetToUpdate.size = widget.size;
            //             widgetToUpdate.text = widget.text;
            //             return angular.copy(widgetToUpdate);
            //         } else if(widgetToUpdate.widgetType === "HTML") {
            //             widgetToUpdate.text = widget.text;
            //             return angular.copy(widgetToUpdate);
            //         } else {
            //             widgetToUpdate.width = widget.width;
            //             widgetToUpdate.url = widget.url;
            //             return angular.copy(widgetToUpdate);
            //         }
            //     }
            // }
            // return null;
        }

        function deleteWidget(widgetId) {
            return $http.delete("/api/widget/" + widgetId);
            // for(var w in widgets) {
            //     var widgetToDelete = widgets[w];
            //     if (widgetToDelete._id === widgetId) {
            //         widgets.splice(w,1);
            //         return angular.copy(widgetToDelete);
            //     }
            // }
            // return null;
        }

        

    }



})();