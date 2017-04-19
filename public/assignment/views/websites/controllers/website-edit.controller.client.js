(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService, $location){
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.deleteWebsite = deleteWebsite;
        vm.update = update;


        function init() {
            // vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                });

            // vm.website = WebsiteService.findWebsiteById(vm.websiteId);
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function (website) {
                    vm.website = website;
                });
        };
        init();

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .success(function (website) {
                    if(website){
                        $location.url("/user/" + vm.userId + "/website");
                    }
                })
        }

        function update(editedWebsite) {
            // var website = WebsiteService.updateWebsite(vm.websiteId, editedWebsite);
            WebsiteService
                .updateWebsite(vm.websiteId, editedWebsite)
                .success(function (website) {
                    if(website==null){
                        vm.error = "Unable to update website !";
                    }
                    else{
                        $location.url("/user/" + vm.userId + "/website");
                    }
                })
        }

    }
})();
