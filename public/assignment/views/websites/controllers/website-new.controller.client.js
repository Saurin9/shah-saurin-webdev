(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.createWebsite = createWebsite;

        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId);

            promise.success(function (websites) {
                vm.websites = websites;
                console.log(vm.websites);
            })
        }
        init();

        function createWebsite(website) {
            // WebsiteService.createWebsite(vm.userId, website);
            WebsiteService
                .createWebsite(vm.userId, website)
                .success(function (newWebsite) {
                    if(newWebsite){
                        $location.url("/user/" + vm.userId + "/website");
                    }
                })
        }



    }

})();