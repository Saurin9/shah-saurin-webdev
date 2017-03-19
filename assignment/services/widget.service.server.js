module.exports = function (app, model) {

    app.get('/api/page/:pageId/widget', findWidgetsByPageId);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.post('/api/page/:pageId/widget', createWidget);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);

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


    var multer = require('multer'); // npm install multer --save

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + "/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now() + '.' + extension)
        }
    });
    var upload = multer({storage: storage});

    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {
        var pageId = req.body.pageId;
        var widgetId_update = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var myFile = req.file;
        var destination = myFile.destination; // folder where file is saved to
        if (widgetId_update) {
            var widgetId = widgetId_update;
        }else{

            var widgetId = ((new Date()).getTime()).toString();

            var newWidget = {
                _id: widgetId,
                widgetType: "IMAGE",
                pageId: pageId,
                width: width,
                url: ""
                // url:widget.url
            };
            widgets.push(newWidget);
        }

        for (var i in widgets) {

            if (widgets[i]._id == widgetId) {
                widgets[i].width = width;
                widgets[i].url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;

            }
        }

        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
    }




    function findWidgetsByPageId (req, res) {
        var pageId = req.params['pageId'];
        var widgetsById = [];
        for (var w in widgets){
            if(widgets[w].pageId === pageId){
                widgetsById.push(widgets[w]);
            }
        }
        res.json(widgetsById);
    }

    function findWidgetById (req, res) {
        var widgetId = req.params['widgetId'];
        for(var w in widgets){
            if(widgets[w]._id === widgetId){
                res.json(widgets[w]);
            }
        }
        // return null;
    }

    function createWidget (req, res) {
        var pageId = req.params['pageId'];
        var widget = req.body;
        var newWidget;
        if(widget.widgetType === "HEADER") {
            newWidget = { "_id": (new Date()).getTime().toString(),
                "widgetType": widget.widgetType, "pageId": pageId, "size": widget.size, "text": widget.text};
        } else if (widget.widgetType === "HTML") {
            newWidget = { "_id": (new Date()).getTime().toString(),
                "widgetType": widget.widgetType, "pageId": pageId, "text": widget.text};
        } else {
            newWidget = { "_id": (new Date()).getTime().toString(),
                "widgetType": widget.widgetType, "pageId": pageId, "width": widget.width, "url": widget.url};
        }
        widgets.push(newWidget);
        res.json(newWidget);
    }

    function updateWidget (req, res) {
        var widgetId = req.params['widgetId'];
        var widget = req.body;
        for(var w in widgets) {
            var widgetToUpdate = widgets[w];
            if (widgetToUpdate._id === widgetId) {
                if(widgetToUpdate.widgetType === "HEADER") {
                    widgetToUpdate.size = widget.size;
                    widgetToUpdate.text = widget.text;
                    res.json(widgetToUpdate);
                    return;
                } else if(widgetToUpdate.widgetType === "HTML") {
                    widgetToUpdate.text = widget.text;
                    res.json(widgetToUpdate);
                    return;
                } else {
                    widgetToUpdate.width = widget.width;
                    widgetToUpdate.url = widget.url;
                    res.json(widgetToUpdate);
                    return;
                }
            }
        }
        // return null;
    }

    function deleteWidget (req, res) {
        var widgetId = req.params['widgetId'];
        for(var w in widgets) {
            var widgetToDelete = widgets[w];
            if (widgetToDelete._id === widgetId) {
                widgets.splice(w,1);
                res.json(widgetToDelete);
            }
        }
        // return null;
    }

};