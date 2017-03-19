module.exports = function (app, model) {

    app.get('/api/website/:websiteId/page', findPageByWebsiteId);
    app.get('/api/page/:pageId', findPageById);
    app.post('/api/website/:websiteId/page', createPage);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);


    // var pages = [
    //     {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    //     {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    //     {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
    // ];

    function findPageByWebsiteId(req, res) {
        var websiteId = req.params['websiteId'];
        model
            .pageModel
            .findPageByWebsiteId(websiteId)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );

        // var pgs = [];
        // for (var p in pages){
        //     if(pages[p].websiteId === websiteId){
        //         pgs.push(pages[p]);
        //     }
        // }
        // res.json(pgs);
    }

    function findPageById(req, res) {
        var pageId = req.params['pageId'];
        model
            .pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    res.json(page);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
        // for (var p in pages){
        //     if(pages[p]._id === pageId){
        //         res.json(pages[p]);
        //         return;
        //     }
        // }
        // return null;
    }

    function createPage (req, res) {
        var websiteId = req.params['websiteId'];
        var page = req.body;
        model
            .pageModel
            .createPage(websiteId, page)
            .then(
                function (newPage) {
                    model
                        .websiteModel
                        .addPageToWebsite(websiteId, newPage)
                        .then(
                            function (website) {
                                res.json(newPage);
                            },
                            function (err) {
                                res.sendStatus(400);
                            }
                        );
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
        // var page_new = {_id: (new Date()).getTime().toString(),
        //     name: page.name,
        //     websiteId: websiteId,
        //     description: page.description};
        // pages.push(page_new);
        // res.json(page_new);
    }

    function updatePage(req, res){
        var pageId = req.params['pageId'];
        var page = req.body;
        model
            .pageModel
            .updatePage(pageId, page)
            .then(
                function (page) {
                    res.json(page);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );

        // for(var p in pages){
        //     var pg = pages[p];
        //     if(pg._id === pageId ) {
        //         pages[p].name = page.name;
        //         pages[p].description = page.description;
        //         res.json(page);
        //     }
        // }
        // // return null;
    }

    function deletePage(req, res){
        var pageId = req.params['pageId'];
        model
            .pageModel
            .deletePage(pageId)
            .then(
                function (page) {
                    res.json(page);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
        // for (var p in pages){
        //     if(pages[p]._id === pageId){
        //         res.json(pages[p]);
        //         pages.splice(p, 1);
        //         return;
        //     }
        // }
    }

};
