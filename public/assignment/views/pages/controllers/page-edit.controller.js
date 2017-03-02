(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, PageService, $location) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        vm.deletePage = deletePage;
        vm.update = update;


        function init() {
            // vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });

            // vm.page = PageService.findPageById(vm.pageId);
            PageService
                .findPageById(vm.pageId)
                .success(function (page) {
                    vm.page = page;
                });
        }
        init();

        function deletePage() {
            PageService
                .deletePage(vm.pageId)
                .success(function (page) {
                    if(page){
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    }
                })
        }

        function update(editedPage) {
            // var page = PageService.updatePage(vm.pageId, editedPage);
            PageService
                .updatePage(vm.pageId, editedPage)
                .success(function (page) {
                    if(page == null){
                        vm.error = "Unable to update page !";
                    }
                    else{
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");;
                    }
                })
        }


    }

})();