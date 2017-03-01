(function () {
    angular
        .module("WebAppMaker")
        .factory('WebsiteService', WebsiteService);
    
    function WebsiteService($http) {

        // var websites = [
        //     { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        //     { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        //     { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        //     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        //     { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        //     { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        // ];


        var api = {
            "findWebsitesByUser": findWebsitesByUser,
            "createWebsite": createWebsite,
            "deleteWebsite": deleteWebsite,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite
        };
        return api;


        function findWebsitesByUser(userId) {
            return $http.get("/api/user/" + userId + "/website");
            // var sites = [];
            // for (var w in websites){
            //     if(websites[w].developerId === userId){
            //         sites.push(websites[w]);
            //     }
            // }
            // return sites;
        }

        function createWebsite(userId, website) {
            return $http.post("/api/user/" + userId + "/website", website);
            // var website_new = {_id: (new Date()).getTime().toString(),
            //     name: website.name,
            //     developerId: userId,
            //     description: website.description};
            // websites.push(website_new);
        }


        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/" + websiteId);
            // for (var w in websites){
            //     if(websites[w]._id === websiteId){
            //         websites.splice(w, 1);
            //     }
            // }
        }

        function findWebsiteById(wid) {
            return $http.get("/api/website/" + wid);
            // for (var w in websites){
            //     if(websites[w]._id === wid){
            //         return angular.copy(websites[w]);
            //     }
            // }
            // return null;
        }

        function updateWebsite(wid, website) {
            return $http.put("/api/website/" + wid, website);
            // for(var w in websites){
            //     var web = websites[w];
            //     if(web._id === websiteId ) {
            //         websites[w].name = website.name;
            //         websites[w].description = website.description;
            //         return website;
            //     }
            // }
            // return null;

        }
    }
    
})();