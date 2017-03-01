(function () {
    angular
        .module("WebAppMaker")
        .factory('PageService', PageService);

    function PageService($http) {

        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];

        var api = {
            "findPageByWebsiteId": findPageByWebsiteId,
            "createPage": createPage,
            "deletePage": deletePage,
            "findPageById": findPageById,
            "updatePage": updatePage
        };
        return api;


        function findPageByWebsiteId(websiteId) {
            var pgs = [];
            for (var p in pages){
                if(pages[p].websiteId === websiteId){
                    pgs.push(pages[p]);
                }
            }
            return pgs;
        }

        function createPage(websiteId, page) {
            var page_new = {_id: (new Date()).getTime().toString(),
                name: page.name,
                websiteId: websiteId,
                description: page.description};
            pages.push(page_new);

        }

        function deletePage(pageId) {
            for (var p in pages){
                if(pages[p]._id === pageId){
                    pages.splice(p, 1);
                }
            }
        }

        function findPageById(pageId) {
            for (var p in pages){
                if(pages[p]._id === pageId){
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for(var p in pages){
                var pg = pages[p];
                if(pg._id === pageId ) {
                    pages[p].name = page.name;
                    pages[p].description = page.description;
                    return page;
                }
            }
            return null;

        }

    }

})();