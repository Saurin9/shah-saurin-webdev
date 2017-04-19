module.exports = function (app, model) {

    app.get('/api/user/:userId/website', findWebsitesByUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.delete('/api/website/:websiteId', deleteWebsite);
    app.put('/api/website/:websiteId', updateWebsite);
    app.post('/api/user/:userId/website', createWebsite);

    //var usermodel = model.userModel;

    // var websites = [
    //     { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    //     { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    //     { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    //     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    //     { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    //     { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    // ];
    
    function findWebsitesByUser(req, res) {
        var userId = req.params['userId'];
        model
            .websiteModel
            .findWebsitesByUser(userId)
            .then(
                function (sites) {
                    res.json(sites);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
        // var userId = req.params['userId'];
        // var sites = []   ;
        // for (var w in websites){
        //     if(websites[w].developerId === userId){
        //         sites.push(websites[w]);
        //     }
        // }
        // res.json(sites);
    }

    function findWebsiteById(req, res) {
        var wid = req.params['websiteId'];
        //var userId = req.params['userId'];
        model
            .websiteModel
            .findWebsiteById(wid)
            .then(
                function (site) {
                    res.json(site);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );

       //  for (var w in websites){
       //      if(websites[w]._id === wid){
       //          res.json(websites[w]);
       //          return;
       //      }
       //  }
       // // return null;
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        // model
        //     .websiteModel
        //     .deleteWebsite(wid)
        //     .then(
        //         function (site) {
        //             res.json(site);
        //         },
        //
        //         function (err) {
        //             res.sendStatus(400);
        //         }
        //     );

        model
            .websiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    model
                        .pageModel
                        .removeAllPagesForWebsite(website.pages)
                        .then(
                            function () {
                                model
                                    .userModel
                                    .removeWebsiteFromUser(websiteId, website._user[0])
                                    .then(
                                        function (website) {
                                            model
                                                .websiteModel
                                                .deleteWebsite(websiteId)
                                                .then(
                                                    function (website) {
                                                        res.json(website);
                                                    },
                                                    function (err) {
                                                        res.sendStatus(400).send(err);
                                                    }
                                                );
                                        },
                                        function (err) {
                                            res.sendStatus(400).send(err);
                                        }
                                    );
                            },
                            function (err) {
                                res.sendStatus(400).send(err);
                            }
                        );
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });


        // for (var w in websites){
        //     if(websites[w]._id === wid){
        //         res.json(websites[w]);
        //         websites.splice(w, 1);
        //         return;
        //     }
        // }
    }

    function updateWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        var newWebsite = req.body;
        model
            .websiteModel
            .updateWebsite(websiteId, newWebsite)
            .then(
                function (newWebsite) {
                    res.json(newWebsite);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
        //
        // for(var w in websites){
        //     var web = websites[w];
        //     if(web._id === websiteId ) {
        //         websites[w].name = newWebsite.name;
        //         websites[w].description = newWebsite.description;
        //         res.json(newWebsite);
        //     }
        // }
        // // return null;
    }

    function createWebsite (req, res) {
        var userId = req.params['userId'];
        var website = req.body;
        model
            .websiteModel
            .createWebsite(userId, website)
            .then(
                function (newWebsite) {
                    model
                        .userModel
                        .addWebsiteIdToUser(userId,newWebsite)
                        .then(
                            function(user) {
                                res.json(newWebsite);
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

        // var website_new = {_id: (new Date()).getTime().toString(),
        //     name: website.name,
        //     developerId: userId,
        //     description: website.description};
        // websites.push(website_new);
        // res.json(website_new);
    }

};