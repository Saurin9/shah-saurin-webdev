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
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
        };
        init();

        function deletePage() {
            PageService.deletePage(vm.pageId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function update(editedPage) {
            var page = PageService.updatePage(vm.pageId, editedPage);
            if(page == null){
                vm.error = "Unable to update page !";
            }
            else{
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");;
            }
        }


    }

})();