module.exports = function (app) {

    app.get('/api/user/:userId/website', findWebsitesByUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.delete('/api/website/:websiteId', deleteWebsite);
    app.put('/api/website/:websiteId', updateWebsite);
    app.post('/api/user/:userId/website', createWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];
    
    function findWebsitesByUser(req, res) {
        var userId = req.params['userId'];
        var sites = [];
        for (var w in websites){
            if(websites[w].developerId === userId){
                sites.push(websites[w]);
            }
        }
        res.json(sites);
    }

    function findWebsiteById(req, res) {
        var wid = req.params['websiteId'];
        for (var w in websites){
            if(websites[w]._id === wid){
                res.json(websites[w]);
                return;
            }
        }
       // return null;
    }

    function deleteWebsite(req, res) {
        var wid = req.params['websiteId'];
        for (var w in websites){
            if(websites[w]._id === wid){
                res.json(websites[w]);
                websites.splice(w, 1);
                return;
            }
        }
    }

    function updateWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        var newWebsite = req.body;
        for(var w in websites){
            var web = websites[w];
            if(web._id === websiteId ) {
                websites[w].name = newWebsite.name;
                websites[w].description = newWebsite.description;
                res.json(newWebsite);
            }
        }
        // return null;
    }

    function createWebsite (req, res) {
        var userId = req.params['userId'];
        var website = req.body;
        var website_new = {_id: (new Date()).getTime().toString(),
            name: website.name,
            developerId: userId,
            description: website.description};
        websites.push(website_new);
        res.json(website_new);
    }

};