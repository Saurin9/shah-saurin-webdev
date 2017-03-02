(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);


    function PageNewController($routeParams, PageService, $location) {
        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.createPage = createPage;

        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
        }
        init();

        function createPage(page) {
            PageService
                .createPage(vm.websiteId, page)
                .success(function (page) {
                    if(page){
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    }
                })
        }



    }
})();